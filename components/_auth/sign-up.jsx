"use client";
import React, { useState } from 'react'
import AmberButton from '../_reusable/amber-button'
import TextInput, { PasswordInput } from '../_reusable/form-input'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Form,} from "@/components/ui/form";
import { renderPasswordChecks } from '@/libs/passwordRender';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';




 
export default function SignupForm() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
   const queryClient= useQueryClient()
   const setUser = useAuthStore((state) => state.setUser);

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const passwordValidation = z.string().min(6, "Password must be at least 6 characters")
    .regex(passwordPattern, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");

    const formSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    email:z.email("Invalid email address"),
    password: passwordValidation
  });
  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      email: "", 
      password: "",
    },
  });

  const password = form.watch("password");

 
  
const registerCompany = async (data) => {
  const response = await axios.post(
   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, data, { withCredentials: true });
  return response.data;
  
};

// Use useMutation to handle the registration
const mutation = useMutation({
  mutationFn: registerCompany,
  onSuccess: (data) => {
  toast.success(data.message);

  // Defensive: make sure slug exists
  if (!data?.slug) {
    toast.error("Something went wrong: missing company slug");
    return;
  }


  // Reset form
  form.reset();

  // Set user state safely
  if (data.user) {
    setUser(data.user);
  }
 

  // Invalidate queries
  queryClient.invalidateQueries(["user"]);

  // Delay redirect slightly to avoid race condition
  setTimeout(() => {
    router.push(`/${data.slug}/dashboard`);
  }, 300);
},

  onError: (error) => {
  const message = error?.response?.data?.message || "Registration failed";
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
          name="companyName"
          label="Company Name"
          type="text"
          placeholder="Enter your company name"
          />
        <TextInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <PasswordInput
          form={form}
          name="password"
          label="Password"
          placeholder="Enter your password"
          visible={visible}
          setVisible={setVisible}
        />
       




        <AmberButton 
          name="Sign Up"
          isPending={mutation.isPending}
          isPendingName="Creating Account..."
          type="submit"
        />

   {/* Password Criteria Checklist */}
          {renderPasswordChecks(password)}

      </form>
      </Form>
    </div>
  )
}
