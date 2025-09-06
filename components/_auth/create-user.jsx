"use client";
import React from 'react'
import AmberButton from '../_reusable/amber-button'
import  { PlainTextInput, SelectForm } from '../_reusable/form-input'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Form,} from "@/components/ui/form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Briefcase, Crown } from 'lucide-react';
import { Button } from '../ui/button';



const role = [
    {icon:Crown, label:"Admin", value:"admin"},
    {icon:Briefcase, label:"Recruiter", value:"recruiter"}
]


export default function NewUserForm({companyId,slug,companyName,setIsAddUserOpen}) {


   const queryClient= useQueryClient()
   
 
    const formSchema = z.object({
    email:z.email("Invalid email address"),
    role:z.string("Please select a role")
  });
  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
   
      email: "", 
        role:""
    },
  });

  

 
  
const registerNewUser = async (data) => {
  const response = await axios.post(
   `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${slug}/create`, data, { withCredentials: true });
  return response.data;
  
};

// Use useMutation to handle the registration
const mutation = useMutation({
  mutationFn: registerNewUser,
  onSuccess: (data) => {
    toast.success(data.message);
    form.reset();

    queryClient.invalidateQueries(['company_profile', slug]);
    setIsAddUserOpen(false);
  },
  onError: (error) => {
  const message = error?.response?.data?.message || "Registration failed";
  toast.error(message);
}

})
   async function onSubmit(data) {
    const userData={companyId,companyName,...data}
    mutation.mutate(userData);
    //console.log(userData)
    
  }
  
  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
         
        <PlainTextInput
          form={form}
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

       <SelectForm
       form={form}
       label={"Role"}
       name={'role'}
       placeholder={'select member role'}
       options={role}
      
       />
       



          <div className="flex justify-end gap-2">
                <Button disabled={mutation.isPending} variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button disabled={mutation.isPending} type="submit"
                  
                  className="bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-800 hover:to-indigo-600"
                >
                  {mutation.isPending ? "Adding..." : "Add Member"}
                </Button>
              </div>
  

      </form>
      </Form>
    </div>
  )
}
