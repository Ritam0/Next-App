import dbConnect from "@/lib/dbConnect";
import userModel from "@/model/User";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    await dbConnect();
    
    try {
        const { username, email, password } = await request.json();

        // Check if username exists
        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "User Already Exists",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Check if email exists
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Email Already Exists",
                }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Registration Complete",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (err) {
        if (err instanceof Error) {
            console.error("Error in registration:", err.message);
        } else {
            console.error("Unknown error occurred", err);
        }
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error in registering",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
    
}
