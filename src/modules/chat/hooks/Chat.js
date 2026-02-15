
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { createChatWithMessage, deleteChat, getallChats, getChatById, } from "../action";
import { toast } from "sonner";


export const useGetChats = () => {
    return useQuery({
        queryKey: ["chats"],
        queryFn: getallChats,
    });
};



export const useCreateChat = () => {

    const queryClient = useQueryClient();
    const router = useRouter()

    return useMutation({
        mutationFn: (values) => createChatWithMessage(values),
        onSuccess: (res) => {
            if (res.success && res.data) {
                const chat = res.data
                queryClient.invalidateQueries(['chats']);
                router.push(`chat/${chat.id}?autoTrigger=true`)
            }
        },
        onError: (error) => {
            console.error("Create Chat Error", error);
            toast.error("Failed To Create Chat")

        }
    })
}



export const useDeleteChat = (chatId) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    return useMutation({
        mutationFn: () => deleteChat(chatId),
        onSuccess: () => {
            queryClient.invalidateQueries(['chats']);
            router.push("/");
        },
        onError: () => {
            toast.error("Failed to delete chat");
        },
    });
};


export const useGetChatById = (chatId) => {

    return useQuery({
        queryKey :['chats' , chatId] ,
        queryFn : () => getChatById(chatId),
        

    })
}