/* eslint-disable react/react-in-jsx-scope */
"use client"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChatInputValidation } from "@/lib/validations/chat.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonal, Smile } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import qs from "query-string";
import axios from "axios";

interface ChatInputProps{
    apiUrl:string;
    query:Record<string,any>;
    name:string;
    type:"conversation" |"channel";
}

export default function ChatInput({apiUrl,query,name,type}:ChatInputProps) {
    const form =useForm<z.infer<typeof ChatInputValidation>>({
    resolver:zodResolver(ChatInputValidation),
    defaultValues:{
        content:"",
    }
    })
    const isLoading =form.formState.isSubmitting;
    const onSubmit = async (values:z.infer<typeof ChatInputValidation>)=>{
       try {
        const url = qs.stringifyUrl({
            url:apiUrl,
            query,
        });
        await axios.post(url,values);
       } catch (error) {
        console.log(error);
       }
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
                control={form.control}
                name="content"
                render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <div className="relative p-4 pb-6">
                                <div className="absolute top-7 left-8">
                                <Smile className="text-slate-400"/>
                                </div>
                                <Input disabled={isLoading} className="px-14 py-6 bg-slate-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-slate-200" placeholder={`Message ${type === "conversation" ? name : "#"+name}`} {...field}/>
                                <button type="button" onClick={()=>{}}
                                className="absolute top-7 right-8 h-[24px] w-[24px] bg-slate-400 hover:bg-slate-300 transition rounded-full p-1 flex items-center justify-center"
                                > 
                                 <SendHorizonal className="text-slate-700"/>
                                </button>
                            </div>
                        </FormControl>
                    </FormItem>
                )}
            />
        </form>
    </Form>
  )
}
