
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import { createChatWithMessage } from "../action";
import { toast } from "sonner";


export const useCreateChat = () => {

    const queryClient = useQueryClient();
    const router = useRouter()

    return useMutation({
        mutationKey : ['newChat'],
        mutationFn : (values) => createChatWithMessage(values),
        onSuccess : (res) => {
            if(res.success && res.data){
                const chat = res.data
                queryClient.invalidateQueries(['chats']);
                router.push(`chat/${chat.id}?autoTrigger=true`)
            }
        },
        onError: (error) => {
            console.error("Create Chat Error" , error);
            toast.error("Failed To Create Chat")
            
        }
    })
}