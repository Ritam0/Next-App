import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request:Request){
    await dbConnect();
    const {username,content}=await request.json();
    try{
        const user=await userModel.findOne({username});
        if(!user){
            return Response.json(
                {
                    succes:false,
                    message:"User not found"
                },{
                    status:404
                }
            )
        }
        if(!user.isAcceptingMessage){
            return Response.json(
                {
                    succes:false,
                    message:"User not accepting messages"
                },{
                    status:404
                }
            )
        }
        const newMessage={content,createdAt:new Date()}
        user.message.push(newMessage as Message)
        await user.save()
        return Response.json(
            {
                succes:true,
                message:"Message sent"
            },{
                status:200
            }
        )
    }catch(err){
        return Response.json(
            {
                succes:false,
                message:"Error in sending messages"
            },{
                status:404
            }
        )
    }
}