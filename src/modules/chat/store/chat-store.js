import { create } from "zustand";

export const useChatStore = create((set, get) => ({
    activeChatId: null,

    chats: [],
    messages: [],
    triggeredChats:new Set(),


    setChats: (chats) => set({ chats }),
    setMessages: (messages) => set({ messages }),

    // add New Chat On Create 

    addChat : (chat) => set({chats : [chat , ...get().chats]}),
    addMessage : (message) => set({messages : [message , ...get().messages]}),

    // clear message 
    clearMessage : () => set({messages : []}),

    setActiveChatId: (chatId) => set({ activeChatId: chatId }),


    markChatAsTriggered :(chatId) => {
        const triggered = new Set(get().triggeredChats) ;
        triggered.add(chatId)
        set({triggeredChats : triggered})
    },

    hasChatBeenTrigger : (chatId) => {
        return get().triggeredChats.has(chatId)
    }
}))