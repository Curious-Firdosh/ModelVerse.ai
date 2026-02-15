'use client'

import Modal from "@/components/ui/modal"
import { useDeleteChat } from "../hooks/Chat"
import { toast } from "sonner"


const DeleteChatModal = ({
    isOpenDeleteModal,
    setisOpenDeleteModal,
    chatId
}) => {

    const { mutateAsync, isPending } = useDeleteChat(chatId)
    
    const handleDelete = async () => {

        try {
            await mutateAsync()
            toast.success("Chat Deleted")
            setisOpenDeleteModal(false)

        }
        catch (err) {
            console.error("Error Delete message:", err);
            toast.error("Failed to Delete message");
        }

    }


    return (
        <div>
            <Modal
                isOpen={isOpenDeleteModal}
                title={"Delete Chat"}
                description="Are you sure you want to delete this Chat? This action cannot be undone."
                onClose={() => setisOpenDeleteModal(false)}
                onSubmit={handleDelete}
                submitText={isPending ? "Deleting..." : "Delete"}
                submitVariant="destructive"
            >

                <p className="text-sm text-zinc-500">
                    Once deleted, all requests and data in this Chat will be permanently removed.
                </p>

            </Modal>
        </div>
    )
}

export default DeleteChatModal
