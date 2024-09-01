'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/Schemas/signUpSchema"
import axios from 'axios'

const page = () => {
  const [username,serUsername]=useState('');
  const [usernameMessage,setUsernameMessage]=useState('');
  const [isCheckingUsername,setIsCheckingUsername]=useState(false);
  const [isSubmitting,setIsSubmitting]=useState(false);
  const debouncedUsername=useDebounceValue(username,300);
  const { toast } = useToast();
  const router =useRouter();

  //zod implementation
  const form=useForm({
    resolver:zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })

//__________________________________________________________________________________________________________________________
  //$$** Cheaking Username uniqueness **$$//

  // useEffect(()=>{
  //   const cheakUsernameUnique=async()=>{
  //     if(debouncedUsername){
  //       setIsCheckingUsername(true);
  //       setUsernameMessage('');
  //       try{
  //         const response=await axios.get(`/api/cheak-username-unique?username=${debouncedUsername}`);
  //         setUsernameMessage(response.data.message);
  //         setIsCheckingUsername(false);
  //       }
  //       catch(err){
  //         console.log("Username already taken");
  //         setIsCheckingUsername(false);
  //       }
  //     }
  //   }
  // },[debouncedUsername])
  //____________________________________________________________________________________________________________
  
  const onSubmit=async (data:z.infer<typeof signUpSchema>)=>{

  }

  return (
    <div>
      
    </div>
  )
}

export default page
