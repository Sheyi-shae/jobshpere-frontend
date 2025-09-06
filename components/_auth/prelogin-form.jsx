"use client";
import React from 'react'
import AmberButton from '../_reusable/amber-button'
import TextInput from '../_reusable/form-input'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Form,} from "@/components/ui/form";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';




 
export default function PreloginForm() {
  const router = useRouter();
  
    const formSchema = z.object({
    email:z.email(),
  });
  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "", 
      
    },
  });

 
    const registerCompany = async (data) => {
    const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/prelogin`, data,);
    return response.data;
    
    };

// Use useMutation to handle the registration
const mutation = useMutation({
  mutationFn: registerCompany,
  onSuccess: (data) => {
    form.reset();
    router.replace(`/${data.slug}/signin?email=${encodeURIComponent(data.userEmail)}`); 
  },
  onError: (error) => {
  const message = error?.response?.data?.message || "Login failed";
  toast.error(message);
}

})
   async function onSubmit(data) {
    mutation.mutate(data);
    
  }
  
  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
       
        <TextInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        




        <AmberButton 
          name="Continue"
          isPending={mutation.isPending}
          isPendingName="Please wait..."
          type="submit"
        />

      </form>
      </Form>
    </div>
  )
}
