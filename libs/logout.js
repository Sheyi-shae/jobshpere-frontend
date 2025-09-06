import axios from "axios";
import { redirect } from "next/navigation";
export default  async function logout() {
 
   // logout functionality
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, null,
            {
                withCredentials: true,
            }
        );
         
        // console.log(response);
         redirect('/pre-login')
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
    
}
