
import { redirect } from "next/navigation"
import { requireAuth } from "../../../modules/authentication/actions"

const Authlayout = async ({children}) => {
    
   const session = await requireAuth()


   if(session){
      return  redirect('/')
   }

    return (
        <>
            {children}
        </>
    )
}
export default Authlayout