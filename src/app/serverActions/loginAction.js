
"use server"
import {signIn} from "../../auth"
import DBConnect from "../../utils/config/db"
const LoginAction=async(LoginData)=>{
    await DBConnect();
    try {
       const response= await signIn('credentials',{
             name:LoginData.name,
             email:LoginData.email,
             mobile:LoginData.mobile,
             redirect:false
       })
       return{success:true}
    } catch (error) {
        console.log("invalid credentials");
    }
}
export default LoginAction
