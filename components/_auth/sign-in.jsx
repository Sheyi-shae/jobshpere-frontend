"use client";
import React, { useState }  from 'react'
import AmberButton from '../_reusable/amber-button'
import  { PasswordInput } from '../_reusable/form-input'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod";
import {Form,} from "@/components/ui/form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';




 
export default function SigninForm({slug,email}) {
  const router = useRouter();
   const [visible, setVisible] = useState(false);
     const setUser = useAuthStore((state) => state.setUser);
     const queryClient= useQueryClient()
  
    const formSchema = z.object({
    password:z.string(),
  });
  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "", 
      
    },
  });

 

    const signIn= async (userData) => {
    const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${slug}/login`,userData,
  
    {withCredentials:true}
  );
    return response.data;
    
    };

// Use useMutation to handle the registration
const mutation = useMutation({
  mutationFn: signIn,
  onSuccess: (data) => {
    toast.success(data.message || 'Login successful')
    setUser(data.user);
    queryClient.invalidateQueries(["user"]);
    form.reset();
    if (data?.slug) {
  router.replace(`/${data.slug}/dashboard`);
}

  },
  onError: (error) => {
  const message = error?.response?.data?.message || "Login failed";
  toast.error(message);
}

})

   async function onSubmit(data) {
    const userData={slug,email,...data}
    mutation.mutate(userData);
    
  }
  
  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
       
        <PasswordInput
        form={form}
        label={'Password'}  
        name={'password'}
        placeholder={'*******'}
        setVisible={setVisible}
        visible={visible}

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
