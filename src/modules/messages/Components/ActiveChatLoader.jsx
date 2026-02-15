'use client'


import React, { useEffect } from 'react'
import { useChatStore } from "../../chat/store/chat-store"
import { useGetChatById } from '../../chat/hooks/Chat';
import { Spinner } from '@/components/ui/spinner';

const ActiveChatLoader = ({ chatId }) => {

    const { setActiveChatId, setMessages, addChat, chats } = useChatStore();

    const { data, isPending , isLoading , isError } = useGetChatById(chatId)

   
    useEffect(() => {
        if (!chatId) return;
        setActiveChatId(chatId)
    }, [chatId, setActiveChatId])


    useEffect(() => {

        if (!data || !data.success || !data.data) return;

        const chat = data.data

        // Populate Message 
        setMessages(chat.messages || []);

        if (!chats?.some((c) => c.id === chat.id)) {
            addChat(chat)
        }


    }, [data, setMessages, chats, addChat])


    return null;

}

export default ActiveChatLoader
