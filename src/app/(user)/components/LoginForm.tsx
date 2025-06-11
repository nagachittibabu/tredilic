"use client"

import { useState } from "react";
import Link from "../../../../node_modules/next/link";
import { useRouter } from "../../../../node_modules/next/navigation";
import LoginAction from "../../serverActions/loginAction"

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [passType,setPassType] =useState('password');
    const router = useRouter()

    const handleSubmit = async () => {
        let logindata = { email, password }

        try {
            const response = await LoginAction(logindata)
            if (response?.success) {
                router.push("/")
            }
            else {
                setError("Invalid Username or Password")
            }
        } catch (err) {
            setError("invalid credentials")
        }

    }
    return  (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
                <h1 className="text-2xl font-bold mb-6">Welcome to Login Page</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email or Mobile </label>
                        <input
                            type="email"
                            placeholder="Email or Mobile"
                            className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type={passType}
                            placeholder="password..."
                            className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="text-blue-500 text-sm mt-2"
                        >
                            {passType === 'password' ? 'Show' : 'Hide'} Password
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
                        <Link href="/Register">
                                New User? Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default LoginForm