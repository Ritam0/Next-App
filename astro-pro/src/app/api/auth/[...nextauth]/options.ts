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
                        $or:[
                            {email:credentials.identifier},
                            {username:credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error("user not found");
                    }
                    if(!user.isVerified){
                        throw new Error("Please verify your account first");
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
                token.isVerified=user.isVerified;
                token.isAcceptingMessage=user.isAcceptingMessage;
                token.username=user.username;
            }
            return token
        },
        async session({ session, token }) {
            if(token){
                //next two line gives error
                session.user._id=token._id as string;
                session.user.isVerified=token.isVerified as boolean;
                session.user.isAcceptingMessage=token.isAcceptingMessage as boolean;
                session.user.username=token.username as string;
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