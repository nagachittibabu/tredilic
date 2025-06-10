import UserModel from "../src/utils/models/user";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import DBConnect from "./utils/config/db";

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            async authorize(credentials) {
                console.log("Credentials received:", credentials); 
    
                await DBConnect(); 
                
                const user = await UserModel.findOne({
                    $or: [{ email: credentials?.email }, { mobile: credentials?.mobile }]
                });
    
                console.log("Query Result:", user);
    
                if (!user) throw new Error("User not found with given credentials");
    
                return { id: user._id, name: user.name, email: user.email, role: user.role };
            }
        })
    ],
    secret: process.env.SECRET_KEY,
});
