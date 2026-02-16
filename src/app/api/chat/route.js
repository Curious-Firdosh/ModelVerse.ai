import db from '@/lib/db'
import { CHAT_SYSTEM_PROMPT } from '@/lib/prompt'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { MessageRole, MessageType } from '@prisma/client'
import { convertToModelMessages, streamText, tool } from 'ai'
import { NextResponse } from 'next/server'


const provider = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
})


const convertStoredMessageToUI = (msg) => {

    try {

        const parts = JSON.parse(msg.content);

        const validParts = parts.filter(part => {
            return part.type === 'text'
        });

        if (validParts.length === 0) {
            return null;
        }

        return {
            id: msg.id,
            role: msg.messageRole.toLowerCase(),
            parts: validParts,
            createdAt: msg.createdAt,
        }

    }
    catch (err) {

        return {
            id: msg.id,
            role: msg.messageRole.toLowerCase(),
            parts: [{ type: "text", text: msg.content }],
            createdAt: msg.createdAt,
        };
    }
}

const extractPartsAsJSON = (message) => {

    if (message.parts && Array.isArray(message.parts)) {
        return JSON.stringify(message.parts)
    }

    const content = message.content || ''
    return JSON.stringify([{ type: "text", text: content }])
}

const SYSTEM_UNSUPPORTED_PROVIDERS = [
    "google/gemma",
    "google/palm"
];

const supportsSystemPrompt = (model) => {
    if (!model) return false;

    return !SYSTEM_UNSUPPORTED_PROVIDERS.some(prefix =>
        model.startsWith(prefix)
    );
};


export const POST = async (req) => {

    try {
        const { chatId, messages: newMessages, model, skipUserMessage } = await req.json()

        const previousMessages = chatId ? await db.message.findMany({
            where: { chatId },
            orderBy: { createdAt: 'asc' }
        }) : [];


        const uiMessages = previousMessages.
            map(convertStoredMessageToUI)
            .filter(msg => msg !== null)


        const normalizedNewMessages = Array.isArray(newMessages)
            ? newMessages
            : newMessages
                ? [newMessages]
                : [];

        console.log("📊 Previous messages:", uiMessages.length);
        console.log("📊 New messages:", normalizedNewMessages.length);

        const allUIMessages = [...uiMessages, ...normalizedNewMessages];

        let modelMessages;

        try {

            modelMessages = await convertToModelMessages(allUIMessages)
            console.log("✅ Converted to model messages:", modelMessages.length);
        }
        catch (conversionError) {
            console.error("❌ Message conversion error:", conversionError);

            modelMessages = allUIMessages.map((msg) => ({
                role: msg.role,
                content: msg.parts
                    .filter(p => p.type === "text")
                    .map(p => p.text)
                    .join(`\n`)
            })).filter(m => m.content)

            console.log("⚠️ Using fallback conversion:", modelMessages.length);
        }


        // ✅ FIXED: Proper streamText configuration

        const result = streamText({
            model: provider.chat(model),
            messages: modelMessages,
            ...(supportsSystemPrompt(model) && {
                system: CHAT_SYSTEM_PROMPT
            }),
            system: CHAT_SYSTEM_PROMPT
        })

        return result.toUIMessageStreamResponse({
            sendReasoning: true,
            originalMessages: allUIMessages,
            onFinish: async ({ responseMessage }) => {
                try {
                    const messagesToSave = [];

                    if (!skipUserMessage) {
                        const latestUserMessage = normalizedNewMessages[normalizedNewMessages.length - 1]

                        if (latestUserMessage?.role === 'user') {
                            const userPartsJSON = extractPartsAsJSON(latestUserMessage)

                            messagesToSave.push({
                                chatId,
                                content: userPartsJSON,
                                messageRole: MessageRole.USER,
                                model,
                                messageType: MessageType.NORMAL,

                            })
                        }

                    }


                    if (responseMessage?.parts && responseMessage.parts.length > 0) {

                        const assistantPartsJSON = extractPartsAsJSON(responseMessage)

                        messagesToSave.push({
                            chatId,
                            content: assistantPartsJSON,
                            messageRole: MessageRole.ASSISTANT,
                            model,
                            messageType: MessageType.NORMAL,
                        });
                    }

                    if (messagesToSave.length > 0) {
                        await db.message.createMany({
                            data: messagesToSave
                        })
                    }

                } catch (error) {
                    console.error("❌ Error saving messages:", error);
                }
            }
        })

    }
    catch (error) {
        console.error("❌ API Route Error:", error);
        return NextResponse.json({
            err: "InternalServer Error While Chatting To Ai ",
            details: error.toString()
        }, 500)
    }
}