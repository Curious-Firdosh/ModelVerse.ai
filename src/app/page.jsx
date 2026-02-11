import { Button } from '@/components/ui/button'
import React from 'react'
import UserButton from '../../modules/authentication/components/user-button'
import { getCurrentUser } from '../../modules/authentication/actions'

const page = async () => {

  const user = await getCurrentUser()
  
  if(user){
    return <UserButton user={user}/>
  }

  return (
    <div>
        Hello Welcom To that 
    </div>
  )
}

export default page
