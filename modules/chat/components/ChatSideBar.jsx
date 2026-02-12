'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@base-ui/react'


import { cn } from '@/lib/utils'
import { PlusIcon, SearchIcon, MenuIcon, EllipsisIcon, Trash } from "lucide-react"
import Link from "next/link"

import React, { useState } from 'react'
import LogoButton from '@/app/(auth)/_components/LogoButton'
import UserButton from '../../authentication/components/user-button'

const ChatSideBar = ({user}) => {

    


    const [Searchchat , setSearchchat] = useState('')

    const handleSearchChat = (e) => {
        setSearchchat(e.target.value)
    }
    


  return (
    <div className='flex h-full w-64 flex-col border-r-2 border-border bg-sidebar '>
        
        <div className='flex items-center justify-between border-b border-sidebar-border px-6 py-5 '>

            <div className='flex items-center gap-2'>
                <LogoButton size='small'/>
            </div>

        </div>

        <div className='p-4'>

            <Link href={'/'}>
                <Button className={'w-full'}>
                    <PlusIcon className='size-4'/>
                    <span className='font-semibold'>New Chat</span>
                </Button>
            </Link>

        </div>

        <div className='px-4 pb-4 '>
            <div className='relative'>
                <SearchIcon className=' size-4 absolute left-2 top-2  '/>
                <Input 
                    placeholder='Search Your Chat'
                    className={'pl-9 bg-sidebar-accent border-sidebar-border py-1 rounded-sm'}
                    value={Searchchat}
                    onChange={handleSearchChat}
                />
            </div>
        </div>

        <div className='flex-1 items-center gap-3 overflow-y-auto px-2 '>
            <div className='text-sm   text-muted-foreground py-8 text-center'>
                No Chat Found
            </div>
        </div>


        <div className='p-4 flex  items-center gap-3 border-t border-sidebar-border'>
            <UserButton user={user}/>
            <span className='flex-1 text-sm text-sidebar-foreground truncate '>{user.email}</span>
        </div>
    </div>
  )
}

export default ChatSideBar
