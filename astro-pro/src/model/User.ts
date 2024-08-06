import mongoose ,{Schema,Document} from "mongoose";


export interface Message extends Document{
    content:string;
    createdAt:Date
}

const messageSchema : Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    userName:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    message:Message[];
}

const userSchema : Schema<User>=new Schema({
    userName:{
        type:String,
        required:[true,"Username is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/.+\@.+\..+/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    verifyCode:{
        type:String,
        required:[true,"Verification code is required"],
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"verification expired"],
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:[messageSchema]
})


const userModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",userSchema))

export default userModel;