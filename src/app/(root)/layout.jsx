import { redirect } from "next/navigation"
import { getCurrentUser, requireAuth } from "../../../modules/authentication/actions"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import ChatSideBar from "../../../modules/chat/components/ChatSideBar"
import ChatHeader from "../../../modules/chat/components/ChatHeader"


const layout = async ({children}) => {

    const session = await requireAuth()

    const user = await getCurrentUser()
    
    if(!session){
        redirect('/signin')
    }

    return (
        <div className="flex h-screen overflow-hidden ">

        <ChatSideBar user = {user}/>
        <main className="flex-1 overflow-hidden ">
            <ChatHeader/>
            {children}
        </main>
            
        </div>
    )
}

export default layout