
"use server"

import UserModel from "../../utils/models/User"
import DBConnect from "../../utils/config/db"
const RegisterAction=async(registerData)=>{
    await DBConnect()
    console.log("this is in in registerAction page",registerData);
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