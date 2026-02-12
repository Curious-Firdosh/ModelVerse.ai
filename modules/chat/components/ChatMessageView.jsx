'use client';

import React, { useState } from 'react'
import ChatWelcomeTab from './ChatWelcomeTab';
import ChatMessageForm from './ChatMessageForm';


const ChatMessageView = ({user}) => {

    const [selectedMessage , setSelctedMessage] = useState('')

    const handleOnSelectMessage = (message) => {
        setSelctedMessage(message)
    }

    const handleMessageChange = () => {
        setSelctedMessage('')
    }


  return (
        <>
            <div className='flex flex-col justify-center items-center p-4 h-screen space-y-10'>

                <ChatWelcomeTab
                    userName = {user?.name}
                    onmessageSelect= {handleOnSelectMessage}
                />

                <ChatMessageForm
                    initialMessage={selectedMessage}
                    onmessageChange = {handleMessageChange}
                />

            </div>
        
        </>
  )
}

export default ChatMessageView
