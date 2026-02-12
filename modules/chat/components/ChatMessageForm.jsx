'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'


const ChatMessageForm = ({ initialMessage, onmessageChange }) => {

    const [message, setMessage] = useState('')


    useEffect(() => {
        if (initialMessage) {
            setMessage(initialMessage)
        }
    }, [initialMessage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setMessage('')
            console.log("Message Sent");

        }
        catch (err) {
            console.log("ERROR While Sending Message", err);

        }
    }

    return (
        <div className='w-full max-w-3xl mx-auto px-4 py-6 '>

            <form onSubmit={handleSubmit}>
                <div className=' rounded-2xl border-border shadow-sm transition-all'>
                    <Textarea
                        value={message}
                        placeholder={"Ask Anything ...... Type Message "}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-15 max-h-50  resize-none border-0 bg-transparent px-4 py-3 text-base
                        focus-visible:ring-0 focus-visible:ring-offset-0"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e)
                            }
                        }}
                    />
                </div>

            </form>

        </div>
    )
}

export default ChatMessageForm

