import {z} from 'zod'

const userNameValidation=z
.string()
.min(5,"Username should be atleast 5 characters")
.max(20,"Username should not exceed 20 characters")

export const signUpSchema=z.object({
    username:userNameValidation,
    email:z.string().email({message:'Invaliid email adress'}),
    password:z.string().min(5,{message:"password should be atleast 5 characters"})
})