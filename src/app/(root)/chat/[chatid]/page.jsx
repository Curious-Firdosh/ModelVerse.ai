import React from 'react'
import ActiveChatLoader from '../../../../modules/messages/Components/ActiveChatLoader';
import MessageWithForm from '../../../../modules/messages/Components/MessageWithForm';

const page = async ({params}) => {

    const {chatid} = await params
    console.log(chatid);
    

  return (
    <div>
      <ActiveChatLoader chatId = {chatid} />
      <MessageWithForm chatId = {chatid}/>
    </div>
  )
}

export default page
