
'use client'
import React from 'react'
import { useAccount } from "wagmi";
import { FormEvent, FormEventHandler, useEffect, useState,ChangeEvent } from "react";
import { ethers } from "ethers";
import { parseEther } from "viem";
import { useRouter,usePathname, useSearchParams } from 'next/navigation';

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";

import {vault_abi,vault_address} from '../../../constants/vaultMonitor_abi_byteCode';

export default function page() {
    const [mounted,setMounted]=React.useState(false);
    const [inputFormaddress,setFormAddress]=React.useState("")
    const [components, setComponents] = React.useState("");
    const [validAddress,setValidAddress]:any=React.useState([]); 
    const { address} = useAccount();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
   
    
   
    
     
    
      

    console.log(validAddress)

    const { data: writeData, write } = useContractWrite({
      address: vault_address,
      abi: vault_abi,
      functionName: "addVault",
      account: address,
    });
    useWaitForTransaction({
      hash: writeData?.hash,
      onSuccess() {
      console.log("success")
      },
    })

    React.useEffect(() => setMounted(true), []);
    if(!mounted) return <></>
    
    const handleChange=(e:ChangeEvent<HTMLTextAreaElement>)=>{
      console.log(e.target.value);
      setFormAddress(e.target.value)
      if(components=="error"){
        setComponents("");
      }

    }
    let inputError=0;
    const handleSubmit=async ()=>{
      inputError=0;
      let temp = inputFormaddress.trim();
      temp=temp.replace(/,\s*$/, "");
      let result;
       result=temp.split(",");
      result=result.map((item)=>{
        let temp= item.trim();
        if(temp.length!=42 || (temp[0]!='0' && temp[1]!='x')){

          console.log("error=",temp)
          inputError++;
        }

        return temp;  
      })
      console.log(result);
      console.log(inputError)

      if(inputError==0){
       setValidAddress(result);
        console.log(validAddress);
        
      }else{
        setComponents("error");
      }

    }

    const handleClick=async ()=>{
      console.log(validAddress)
       write({
        args: [validAddress],
      }); 
    }

    

  return (
   <>
   
<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">list the owner addresses of the vault </label>
<textarea id="message" rows={4} className="block p-2.5 w-2/6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 onChange={handleChange}
 value={inputFormaddress} 
 placeholder="0x26A2EAC33dB1E0f4F5CA8Ac80a338eF50e9C989f  ,  0x7911B0b7427e1155B6C279C5407b894815878AE0"></textarea>
  <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
  onClick={handleSubmit}>submit</button>
  {components.length!=0?<h1>invalid addresses</h1>:<></>}
  {validAddress.length!=0?<button onClick={handleClick}>submit</button>:<></>}
   </>


  )
}
