import { ModeToggle } from '@/components/ui/mode-toggle'
import { Sun } from 'lucide-react'
import React from 'react'

const ChatHeader = () => {
  return (
    <div className='flex  h-14 flex-row justify-end items-center border-b border-border bg-sidebar px-6 py-2 pl-3'>
      <ModeToggle/>
    </div>
  )
}

export default ChatHeader
