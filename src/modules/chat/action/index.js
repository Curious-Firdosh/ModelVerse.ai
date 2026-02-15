'use server';
import { MessageRole, MessageType } from "@prisma/client";

import { db } from "@/lib/db";
import { getCurrentUser } from "../../authentication/actions";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import { includes, success } from "zod";

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


export const getallChats = async () => {


    try {

        const user = await getCurrentUser();

        // Validate User
        if (!user) {
            return {
                success: false,
                message: "Unauthorized user"
            }
        }

        const AllChats = await db.chat.findMany({
            where : {userId : user.id},
            include :{
                messages : true
            },
            orderBy :{
                createdAt : 'desc' // descending Order menas latest come first 
            }
        })

        return {
            success : true,
            data : AllChats,
            messaage :"Chat Fetched SuccessFully"
        }

    }
    catch (err) {
        console.error("Errror While Getting All Chats", err);
        toast.error("Cannot Featch Chats")

    }
}


export const deleteChat = async (chatId) => {
    try {

        const user = await getCurrentUser();
        // Validate User
        if (!user) {
            return {
                success: false,
                message: "Unauthorized user"
            }
        }
        const Chat = await db.chat.findUnique({
            where: {
                id: chatId,
                userId: user.id
            }
        })

        if(!Chat) {
            return {
                success: false,
                message: "Chat Not Found"
            }
        }

        const deletedChat = await db.chat.delete({
            where: {
                id: chatId,
                userId: user.id
            }
        })
        
        revalidatePath("/");
        return { success: true, message: "Chat deleted successfully", data: deletedChat };
    } catch (error) {
        console.error("Error deleting chat:", error);
        return { success: false, message: "Failed to delete chat" };
    }
}


export const getChatById = async(chatId) => {
    
    const user = await getCurrentUser();

    
    if (!user) {
        return {
            success: false,
            message: "Unauthorized"
        };
    }

    try {

        const Chat = await db.chat.findFirst({
            where : {
                id: chatId,
                userId : user.id
            },
            include : {
                messages : true
            }
        })

        return {
            success : true,
            messaage: "Chat Fetched SuccesFully",
            data : Chat
        }
    }
    catch(err){
        console.log("Error While Getting Chats By Id" ,err);
        return {
            success : false,
             messaage: err,
        }
        
    }
}