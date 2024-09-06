import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";

export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any):Promise<any>{
                await dbConnect();
                try{
                    const user=await userModel.findOne({
                        
                            email:credentials.identifier
                    })
                    if(!user){
                        throw new Error("user not found");
                    }
                   
                    const isPasswordCorrect=await bcrypt.compare(credentials.password,user.password);
                    if(isPasswordCorrect){
                        return user;
                    }
                    else {
                        throw new Error("Incorrect Password");
                    }
                }catch(err:any){
                    throw new Error(err);
                }
            }
        })
    ],
    callbacks:{
        async jwt({ token, user }) {
            
            if(user){
                
                token._id=user._id?.toString();
                token.username=user.username;
                
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                session.user._id=token._id as string;
                session.user.username=token.username as string;
                console.log(session.user);
                console.log("session user")
            }
            return session
        },
        
      
    },
    pages: {
        signIn: '/sign-in',   
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET
}