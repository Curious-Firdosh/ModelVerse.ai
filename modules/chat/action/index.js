'use server';
import { MessageRole, MessageType } from "@prisma/client";

import {db } from "@/lib/db";
import { getCurrentUser } from "../../authentication/actions";
import { revalidatePath } from "next/cache";

export const createChatWithMessage = async (values) => {

    try {

        // get Current User
        const user = await getCurrentUser()


        // Validate User
        if (!user) {
            return {
                success: false,
                message: "Unauthorized user"
            }
        }

        // Extract the content And the Model Doem the Props
        const { content, model } = values

        if (!content || content.trim() === "") {
            return {
                success: false,
                message: "Message content is required"
            };
        }

        const title = content.slice(0, 30) + (content.length > 50 ? "...." : "")

        const Chat = await db.chat.create({
            data: {
                title,
                model,
                userId: user?.id,
                messages: {
                    create: {
                        content,
                        messageRole: MessageRole.USER,
                        messageType: MessageType.NORMAL,
                        model,
                    }
                },
            },
            include: { messages: true }, // Include messages in response
        })

        revalidatePath("/");
        return { success: true, message: "Chat created successfully", data: Chat };


    }
    catch (error) {
        console.error("Error creating chat:", error);
        return { success: false, message: "Failed to create chat" };
    }
};
