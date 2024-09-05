import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
export async function POST(request:Request){
    await dbConnect();
    try{
        const {userName,code}=await request.json();
        const user=await userModel.findOne({userName});
        if(!user){
            return Response.json(
                {
                    succes:false,
                    message:"User Not Found"
                },{
                    status:500
                }
            )
        }

        const codeMatch=user.verifyCode===code;
        const isExpired=new Date(user.verifyCodeExpiry)<new Date();
        console.log(isExpired);
        console.log(new Date());
        if(!codeMatch){
            return Response.json(
                {
                    succes:false,
                    message:"Incorrect Code"
                },{
                    status:500
                }
            )
        }
        if(isExpired){
            return Response.json(
                {
                    succes:false,
                    message:"Code Expired"
                },{
                    status:500
                }
            )
        }
        if(codeMatch && !isExpired){
            user.isVerified=true;
            user.save();
            return Response.json(
                {
                    succes:true,
                    message:"User Verified"
                },{
                    status:200
                }
            )
        }
    }
    catch(err){
        console.error("User Verification failed",err);
        return Response.json(
            {
                succes:false,
                message:"Verification Failed"
            },{
                status:500
            }
        )
    }
}