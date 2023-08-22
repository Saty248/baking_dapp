

'use client'
import React from 'react'
import { useAccount } from "wagmi";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { ethers } from "ethers";
import { parseEther } from "viem";
import { useRouter,usePathname, useSearchParams } from 'next/navigation';

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import {vault_abi,vault_address} from '../../constants/vaultMonitor_abi_byteCode';

export default function Vaults(){
    const [mounted,setMounted]=React.useState(false);

    const { address} = useAccount();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

     const { data:data1, isError, isLoading }:wagmiRead = useContractRead({
        address: vault_address,
        abi: vault_abi,
        functionName: 'vaults',
        watch:true,
        args: [address]
      }) 
    React.useEffect(() => setMounted(true), []);
    if(!mounted) return <></>

    
    console.log("address=",address);
   

        const vaultButton=data1?.map((item)=>{
          return (<button key={data1.indexOf(item)} onClick={()=>{
            const url = `${pathname}/${item}`
            console.log("clicked",url)
            router.push(`http://localhost:3000/${url}`)
          }} className="focus:outline-none text-white bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">{item}</button>)

       })
       let isVaults=vaultButton?.length==0?false:true;
      
       

    return(

        <>
        <div className='flex  h-screen justify-center items-center flex-col'>
        {isVaults && <h1 className='mb-2 text-xl font-black text-white'>choose your vault</h1>}
         {vaultButton}
        <button  onClick={()=>{
            const url = `${pathname}/CreateVault`
            console.log("clicked",url)
            router.push(`http://localhost:3000/${url}`)
          }} className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'>create a new one</button>
        </div>
        </>


    )
}

