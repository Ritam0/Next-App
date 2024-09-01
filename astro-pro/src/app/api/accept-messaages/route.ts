import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request:Request){
    await dbConnect();
    const session=await getServerSession(authOptions)
    const user:User=session?.user as User;
    if(!session || !session.user){
        return Response.json(
            {
                succes:false,
                message:"session expired"
            },{
                status:401
            }
        )
    }
    const userId=user._id;
    const {acceptMessages}=await request.json();
    try{
        const updatedUser=await userModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage:acceptMessages},
            {new:true}
        )
        if(!updatedUser){
            return Response.json(
                {
                    succes:false,
                    message:"User not found"
                },{
                    status:500
                }
            )
        }
        else{
            return Response.json(
                {
                    succes:true,
                    message:"Message Accepted status changed succesfully"
                },{
                    status:200
                }
            )
        }
    }catch(err){
        console.log("Failed to send msg")
        return Response.json(
            {
                succes:false,
                message:"Failed to send msg"
            },{
                status:500
            }
        )
    }
}

export async function GET(request:Request){
    await dbConnect();
    const session=await getServerSession(authOptions)
    const user:User=session?.user as User;
    if(!session || !session.user){
        return Response.json(
            {
                succes:false,
                message:"session expired"
            },{
                status:401
            }
        )
    }
    const userId=user._id;
    try{
        const foundUser=await userModel.findById(userId);
        if(!foundUser){
            return Response.json(
                {
                    succes:false,
                    message:"User not found"
                },{
                    status:500
                }
            )
        }
        else{
            return Response.json(
                {
                    succes:true,
                    isAcceptingMessages:foundUser.isAcceptingMessage
                },{
                    status:200
                }
            )
        }
    }
    catch(err){
        return Response.json(
            {
                succes:false,
                message:"Message not accepted"
            },{
                status:500
            }
        )
    }
}