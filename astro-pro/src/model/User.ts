import mongoose, { Schema, Document, Model } from "mongoose";


export interface User extends Document{
    username:string;
    email:string;
    password:string;
}

const UserSchema: Schema = new Schema<User>({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
});



const userModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))

export default userModel;