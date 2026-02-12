import { Button } from '@/components/ui/button'
import React from 'react'
import UserButton from '../../../modules/authentication/components/user-button'
import { getCurrentUser } from '../../../modules/authentication/actions'
import { redirect } from 'next/navigation'
import ChatMessageView from '../../../modules/chat/components/ChatMessageView'

const page = async () => {

  const user = await getCurrentUser()

  return (
    <div className='flex h-screen items-center justify-center'>
      <ChatMessageView user ={user} />
    </div>
  )
}

export default page
