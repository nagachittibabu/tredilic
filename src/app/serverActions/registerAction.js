
"use server"

import UserModel from "../../utils/models/user"
import DBConnect from "../../utils/config/db"
const RegisterAction=async(registerData)=>{
    await DBConnect()
    try {
        await UserModel.create({
            name:registerData.name,
            email:registerData.email,
            password:registerData.password,
            role:registerData.role,
            mobile:registerData.mobile
        })
        return {success:true}
    } catch (error) {
        console.log("error is post a user ",error);
        
    }
}
export default RegisterAction