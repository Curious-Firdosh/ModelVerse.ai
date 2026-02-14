'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useAiModels } from '../../ai-agent/hook/ai-agent'
import ModelSelector from './ModelSelector'
import { Spinner } from '@/components/ui/spinner'
import { useCreateChat } from '../hooks/Chat'
import { toast } from 'sonner'


const ChatMessageForm = ({ initialMessage, onmessageChange }) => {

    const [message, setMessage] = useState('');

    const { data: models, isPending } = useAiModels();
    const { mutateAsync, isPending: isChatPending } = useCreateChat()
    const [selectedModel, setSelectedModel] = useState(models?.models[0].id);


    useEffect(() => {
        if (initialMessage) {
            setMessage(initialMessage)
        }
    }, [initialMessage])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            
            if (!message.trim()) {
                toast.error("Message cannot be empty.")
                return
            }

            if (!selectedModel) {
                toast.error("Select a model before sending.")
                return
            }

            await mutateAsync({content : message , model : selectedModel})
            toast.success("Message Sent")

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message");
        } finally {
            setMessage("");
        }
    };


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

                    <div className="flex items-center justify-between gap-2 px-3 py-2 border-t ">

                        {/* Model Selector */}
                        <div>
                            {
                                isPending ? (
                                    <>
                                        <Spinner />
                                    </>
                                ) : (
                                    <ModelSelector
                                        models={models?.models}
                                        selectedModelId={selectedModel}
                                        onModelSelect={setSelectedModel}
                                        className="ml-1"

                                    />
                                )
                            }
                        </div>

                        <Button
                            type="submit"
                            disabled={!message.trim() || isChatPending}
                            size="sm"
                            variant={message.trim() ? "default" : "ghost"}
                            className="h-8 w-8 p-0 rounded-full "
                            aria-label="Send message"
                            title={
                                message.trim() ? "Send message" : "Enter a message to enable"
                            }
                        >
                            {
                                isChatPending ? (
                                    <>
                                        <Spinner className={'animate-spin size-4 '} />
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Send message</span>
                                    </>
                                )
                            }
                        </Button>

                    </div>
                </div>
            </form >

        </div >
    )
}

export default ChatMessageForm

