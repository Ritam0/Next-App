import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request:Request){
    await dbConnect();
    try{
        const {username,email,password}=await request.json();
        const existingUsername= await userModel.findOne({
            username,
            isVerified:true
        })
       // console.log("1")
        if(existingUsername){
            return Response.json({
                succes:false,
                message:"User Already Exists"
            },{status:400})
        }
        const existingEmail= await userModel.findOne({
            email
        })
        //console.log("12")
        const verifyCode=Math.floor(100000+Math.random()*900000).toString();
        if(existingEmail){
            if(existingEmail.isVerified){
                return Response.json({
                    succes:false,
                    message:"Email Already Exists"
                },{status:500})
            }else{
                const  hashedPassword=await bcrypt.hash(password,10);
                //const hashedPassword=password;
                const expiryDate=new Date();
                expiryDate.setHours(expiryDate.getHours()+1);
                existingEmail.password=hashedPassword;
                existingEmail.verifyCode=verifyCode;
                existingEmail.verifyCodeExpiry=expiryDate;
                await existingEmail.save();

            }
            
        }else{
           // console.log("123")
            const  hashedPassword=await bcrypt.hash(password,10);
            //const hashedPassword=password;
            //console.log("2")
            const expiryDate=new Date();
            expiryDate.setHours(expiryDate.getHours()+1);
            const newUser=new userModel({
                userName:username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:true,
                isAcceptingMessage:true,
                message:[]
            })
            //console.log("123")
            await newUser.save();
            //console.log("123d")

            //send verification email
            const emailResponse=await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if(!emailResponse.success){
                return Response.json(
                    {
                        succes:false,
                        message:"Registration failed"
                    },
                    {
                        status:500
                    }
                )
            }
            return Response.json(
                {
                    succes:true,
                    message:"Verification code sent"
                },
                {
                    status:200
                }
            )
        }
    }
    catch(err){
        console.log("Error in sending verification email",err);
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