'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@base-ui/react'


import { cn } from '@/lib/utils'
import { PlusIcon, SearchIcon, MenuIcon, EllipsisIcon, Trash } from "lucide-react"
import Link from "next/link"

import React, { useMemo, useState } from 'react'
import LogoButton from '@/app/(auth)/_components/LogoButton'
import UserButton from '../../authentication/components/user-button'
import { useChatStore } from '../store/chat-store'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteChatModal from './DeleteChatModal'

const ChatSideBar = ({ user, allChats }) => {


    const { activeChatId, setActiveChatId } = useChatStore();
    const [selectedChatid, setselectedChatid] = useState(null)
    const [searchchat, setSearchchat] = useState('')
    const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false)


    const filterdChat = useMemo(() => {
        if (!searchchat.trim()) {
            return allChats
        }

        const query = searchchat.toLowerCase();

        return allChats.filter((chat) =>
            chat.title?.toLowerCase().includes(query) ||
            chat.messages?.some((msg) =>
                msg.content?.toLowerCase().includes(query)
            )
        )

    }, [allChats, searchchat])


    // Group chats by date 

    const groupChats = useMemo(() => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const groups = {
            today: [],
            yesterday: [],
            lastWeek: [],
            older: []
        };

        filterdChat.forEach(chat => {
            const chatDate = new Date(chat.createdAt);
            if (chatDate >= today) {
                groups.today.push(chat);
            } else if (chatDate >= yesterday) {
                groups.yesterday.push(chat);
            } else if (chatDate >= lastWeek) {
                groups.lastWeek.push(chat);
            } else {
                groups.older.push(chat);
            }
        })

        return groups;
    }, [filterdChat])



    const onDelete = (e, chatId) => {
        e.preventDefault();
        e.stopPropagation();
        setselectedChatid(chatId)
        setisOpenDeleteModal(true)

    }

    const handleSearchChat = (e) => {
        setSearchchat(e.target.value)

    }


    const renderChatList = (chatList) => {

        if (chatList.length === 0) return <div>No Chat Found</div>

        return chatList.map((chat) => (
         

                <Link
                    key={chat.id}
                    href={`/chat/${chat.id}`}
                    className={cn(
                        "block rounded-lg px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                        chat.id === activeChatId && "bg-sidebar-accent"
                    )}
                >

                    <div className="flex flex-row justify-between items-center gap-2">
                        <span className="truncate flex-1">{chat.title}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 group-hover:opacity-100 hover:bg-sidebar-accent-foreground/10"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <EllipsisIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="flex flex-row gap-2 cursor-pointer"
                                    onClick={(e) => onDelete(e, chat.id)}
                                >
                                    <Trash className="h-4 w-4 text-red-500" />
                                    <span className="text-red-500">Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </Link>
          
        ))
    }

    return (
        <div className='flex h-full w-64 flex-col border-r-2 border-border bg-sidebar '>

            <div className='flex items-center justify-between border-b border-sidebar-border px-6 py-5 '>

                <div className='flex items-center gap-2'>
                    <LogoButton size='small' />
                </div>

            </div>

            <div className='p-4'>

                <Link href={'/'}>
                    <Button className={'w-full'}>
                        <PlusIcon className='size-4' />
                        <span className='font-semibold'>New Chat</span>
                    </Button>
                </Link>

            </div>

            <div className='px-4 pb-4 '>
                <div className='relative'>
                    <SearchIcon className=' size-4 absolute left-2 top-2  ' />
                    <Input
                        placeholder='Search Your Chat'
                        className={'pl-9 bg-sidebar-accent border-sidebar-border py-1 rounded-sm'}
                        value={searchchat}
                        onChange={handleSearchChat}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
                {
                    filterdChat.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground py-8">
                            {searchchat ? "No chats found" : "No chats yet"}
                        </div>
                    ) : (
                        <>
                            {groupChats.today.length > 0 && (
                                <div className="mb-4">
                                    <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">Today</div>
                                    {renderChatList(groupChats.today)}
                                </div>
                            )}

                            {groupChats.yesterday.length > 0 && (
                                <div className="mb-4">
                                    <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">Yesterday</div>
                                    {renderChatList(groupChats.yesterday)}
                                </div>
                            )}

                            {groupChats.lastWeek.length > 0 && (
                                <div className="mb-4">
                                    <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">Last 7 Days</div>
                                    {renderChatList(groupChats.lastWeek)}
                                </div>
                            )}

                            {groupChats.older.length > 0 && (
                                <div className="mb-4">
                                    <div className="mb-2 px-2 text-xs font-semibold text-muted-foreground">Older</div>
                                    {renderChatList(groupChats.older)}
                                </div>
                            )}
                        </>
                    )
                }
            </div>


            <div className='p-4 flex  items-center gap-3 border-t border-sidebar-border'>
                <UserButton user={user} />
                <span className='flex-1 text-sm text-sidebar-foreground truncate '>{user.email}</span>
            </div>
            
            <DeleteChatModal
                    isOpenDeleteModal={isOpenDeleteModal}
                    chatId={selectedChatid}
                    setisOpenDeleteModal={setisOpenDeleteModal}
            />
            
        </div>
    )
}

export default ChatSideBar
