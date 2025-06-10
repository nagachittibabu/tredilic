"use client";

import { useState } from "react";
import Link from "../../../../node_modules/next/link";
import { useRouter } from "../../../../node_modules/next/navigation";
import registerAction from "../../serverActions/registerAction"
const RegisterForm = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [passType,setPassType] =useState('password')
    const router=useRouter()
    const handleSubmit=async()=>{ 
        if(name && email && password){
        let registerdata={name,email,password,mobile}        
        try {
          const response=  await registerAction(registerdata);
          if(response){
            alert("Successfully Register")
            router.push("/")
          }
          else{
            alert("User already exist -- Please Login")
            router.push("/Login")
          }
        } catch (error) {
            console.log(error);
            
        }
    }
    else{
        alert("Enter all mandatory fields")
    }
    }
    const showPass=(e)=>{
        e.preventDefault();
        if(passType =='password') {
            setPassType("text")
        }
        else{
            setPassType('password')
        }
    }
     return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
                <h1 className="text-2xl font-bold mb-6">Welcome to Register Page</h1>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Name..."
                            className="shadow  border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Email..."
                            required={true}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="text"
                            placeholder="Mobile..."
                            required={true}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type={passType}
                            placeholder="password..."
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="text-blue-500 text-sm mt-2"
                            onClick={(e) => showPass(e)}
                        >
                            {passType === "password" ? "Show" : "Hide"} Password
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <Link href="/Login" className="inline-block  font-bold text-sm text-blue-500 hover:text-blue-800">
                                Existing User? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm
