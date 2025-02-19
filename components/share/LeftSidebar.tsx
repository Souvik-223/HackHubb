/* eslint-disable react/react-in-jsx-scope */
"use client"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import {UserButton,useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import {usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ActionTooltip } from "../chat-models/tools/action-tooltip";

interface LeftSidebrProps{
    className?:string;
}

export default function LeftSidebar({className}:LeftSidebrProps) {

    const pathname= usePathname();
    const {userId} = useAuth();
    const [isMounted,setIsMounted]=useState(false);
    useEffect(()=>{
        setIsMounted(true);
    },[]);
    
      if (!isMounted) {
          return null;
      } 
    
    return (
        <section className={cn("custom-scrollbar leftsidebar",className)}>
            
            <ScrollArea className="pb-1">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {/**maping through index.ts eliments */}
                {sidebarLinks.map((link)=>{
                    const isActive = (pathname?.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    if(link.route==='/profile') link.route=`${link.route}/${userId}`
                    return(
                        <Link href={link.route} key={link.label} className={cn("leftsidebar_link",isActive && 'bg-gradient-to-tr from-red-500 via-purple-500 to-gray-500')}>
                            <ActionTooltip className="lg:hidden" label={link.label} side="left" align="center">
                                <Image src={link.imgURL} alt={link.label} width={24} height={24}/>
                            </ActionTooltip>
                            <p className="text-light-1 max-lg:hidden">
                            {link.label}
                            </p>
                        </Link>
                    )
                })}
                
            </div>
            </ScrollArea>
            <div className="mt-10 px-6">
                <div className="flex cursor-pointer gap-4 p-4">
                    <UserButton afterSignOutUrl="/sign-in" appearance={{ baseTheme:dark,}} />
                    <p className="text-light-2 max-lg:hidden">Settings</p>
                </div>
            </div>
        </section>
    )
}