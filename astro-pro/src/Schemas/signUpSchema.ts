import {z} from 'zod'



export const signUpSchema=z.object({
    username:z.string(),
    email:z.string().email({message:'Invaliid email adress'}),
    password:z.string().min(5,{message:"password should be atleast 5 characters"})
})