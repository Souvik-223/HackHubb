/* eslint-disable react/react-in-jsx-scope */
"use client";

import { ActionTooltip } from '../tools/action-tooltip';
import { useModal } from '@/hooks/use-modal-store';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const NavigationAction = () => {
  const {onOpen}=useModal();
  const [isMounted,setIsMounted]=useState(false);
      useEffect(()=>{
          setIsMounted(true);
      },[]);
  
      if (!isMounted) {
          return null;
      }
    
  return (
    <div>
        <ActionTooltip side='right' align='center' label='Create New ChatRoom'> 
        <button onClick={()=>onOpen("createServer")} className='group flex items-center'>
        <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-slate-700 group-hover:bg-gradient-to-tr from-red-500 via-purple-300 to-gray-500">
            <Image alt='logo' src="/assets/logo.svg" width={25} height={25} className='group-hover:text-white transition text-primary-500'/>
        </div>
        </button>
        </ActionTooltip>
    </div>
  )
}

export default NavigationAction
