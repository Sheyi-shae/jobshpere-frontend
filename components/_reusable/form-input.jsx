"use client";

import {
 
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";


export default function TextInput({form,name,label,type,placeholder}) {

  return (
    
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={'text-slate-50'}>{label}</FormLabel>
              <FormControl>
                <Input type={type} placeholder={placeholder} {...field}
                 className="bg-slate-700/50 border-slate-600
                  text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
      
  );
}

//password input
export function PasswordInput({form,name,label,placeholder,visible, setVisible }) { 
    return (
        <FormField
            control={form.control}
            name={name} 
            render={({ field }) => (
                <FormItem>
                    <FormLabel className={'text-slate-50'}>{label}</FormLabel>
                    <FormControl>
                        <div className="relative">
                        <Input
                            type={visible ? "text" : "password"}    
                             placeholder={placeholder} {...field}
                            className="relative bg-slate-700/50 border-slate-600
                             text-white placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-500/20"
                        />
                    
                    <FormMessage />
                    <button
                        type="button"
                        onClick={() => setVisible(!visible)}
                        className="absolute right-2 top-1/2 transform -translate-y-2.5 text-gray-50 focus:outline-none"
                    >   
                        {visible ? <Eye/> : <EyeClosed/>}
                    </button>
                    </div>
                    </FormControl>
                </FormItem> 
            )}
        />
    );
}


export  function TextInputReadOnly({form,name,label,type,placeholder}) {

  return (
    
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input  className={'bg-slate-200 text-black focus:ring-0'} type={type} placeholder={placeholder} readOnly {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
      
  );
}

  export function SelectForm({ form, name, label, placeholder, options = [] }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
             <SelectTrigger className="w-full h-12 ">
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
              <SelectContent className="w-full max-h-64 overflow-y-auto text-base">
                 {options.map((type) => {
                          const Icon = type.icon
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          )})}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function PlainTextInput({form,name,label,type,placeholder}) {

  return (
    
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={''}>{label}</FormLabel>
              <FormControl>
                <Input type={type} placeholder={placeholder} {...field}
                 className="
                  focus:border-amber-500 focus:ring-amber-500/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
      
  );
}
export  function TextAreaInput({form,name,label,type,placeholder}) {

  return(

    //"Describe what your course covers, who it's for, and what students will achieve..."
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={placeholder}
                        className="min-h-32 resize-y"
                        {...field}
                      />
                    </FormControl>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />
  )}