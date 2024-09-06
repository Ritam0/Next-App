import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from 'bcryptjs';

export async function POST(request:Request){
    await dbConnect();
    try{
        const {username,email,password}=await request.json();
        const existingUsername= await userModel.findOne({
            username:username
        })
        if(existingUsername){
            return Response.json({
                succes:false,
                message:"User Already Exists"
            },{status:400})
        }
        const existingEmail= await userModel.findOne({
            email:email
        })
        if(existingEmail){ 
            return Response.json({
                succes:false,
                message:"Email Already Exists"
            },{status:400})
        }else{
            const  hashedPassword=await bcrypt.hash(password,10);
            const newUser=new userModel({
                username,
                email,
                password:hashedPassword,
            })
            console.log(newUser);
            await newUser.save();
            return Response.json(
                {
                    succes:true,
                    message:"Registration omplete"
                },
                {
                    status:200
                }
            )
        }
    }
    catch(err){
        console.log("Error in registration",err);
        return Response.json(
            {
                succes:false,
                message:"Error in registering"
            },
            {
                status:500
            }
        )
    }
}