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
import { Console } from 'console';
import {vault_abi,vault_address,myVault_abi} from '../../constants/vaultMonitor_abi_byteCode'

export default function ReadButtons({MyVault}:{MyVault:string}){
    const [mounted,setMounted]=React.useState(false);
  
    const { address} = useAccount();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const myVaultAddress=MyVault as `0x${string}`
    console.log(myVaultAddress)
    
    const {data:transactionCount, isSuccess:transactionCountIsSuccess}=useContractRead({
        address:myVaultAddress,
        abi: myVault_abi,
                functionName: 'getTransactionCount',
                watch:true
           })
      console.log(transactionCount);
   
      let transactionCount1
      if(transactionCount){
         transactionCount1=transactionCount.toString()
      }
      const [transactionIdx,settransactionIdx]=React.useState("");
      const {data:transactionDetail, isSuccess:transactionDetailIsSuccess}=useContractRead({
        address:myVaultAddress,
        abi: myVault_abi,
                functionName: 'getTransaction',
                args:[transactionIdx],
                watch:true,
                
           })
           console.log(transactionDetail)
           let transactionDetail1
      if(transactionCount){
        transactionDetail1=transactionDetail?.toString().split(',')
        console.log(transactionDetail1)
      }

      const [transactionIdx2,setTransactionIdx2]=React.useState("")
      const [ownerAddress,setOwnerAddress]=React.useState("")
      const {data:isConfirmed ,isSuccess:isConfirmedIsSuccess}=useContractRead({
        address:myVaultAddress,
        abi: myVault_abi,
                functionName: 'isConfirmed',
                args:[transactionIdx2,ownerAddress],
                watch:true,
                
           })
           console.log( isConfirmed);

           const [transactionIdx3,settransactionIdx3]=React.useState("");
      const {data:transactionDetail3, isSuccess:transactionDetailIsSuccess3}=useContractRead({
        address:myVaultAddress,
        abi: myVault_abi,
                functionName: 'getTransaction',
                args:[transactionIdx3],
                watch:true,
                
           })
           console.log(transactionDetail3)
           const {data:reqConf, isSuccess:reqConfIsSuccess}=useContractRead({
            address:myVaultAddress,
            abi: myVault_abi,
                    functionName: 'numConfirmationsRequired',
                   
                    watch:true,
                    
               })

               console.log(reqConf as string)
               let reqConf1=reqConf?.toString()
               let transactionDetail13
      
      let n1=0,n2=0;
               if(transactionCount){
        transactionDetail13=transactionDetail3?.toString().split(',')
        
         n1=parseInt(transactionDetail13?.[4] as string)
         n2=parseInt(reqConf1 as string)
        console.log(n2-n1)
      }
             

    React.useEffect(() => setMounted(true), []);
  
    const handleChangeTransaction=(e:ChangeEvent<HTMLInputElement>)=>{
        settransactionIdx(e.target.value)
    }

    const handleTransactionIdx2=(e:ChangeEvent<HTMLInputElement>)=>{
        setTransactionIdx2(e.target.value)
    }
    const handleOwnerAddress=(e:ChangeEvent<HTMLInputElement>)=>{
        setOwnerAddress(e.target.value)
    }
    const handletransactionIdx3=(e:ChangeEvent<HTMLInputElement>)=>{
        settransactionIdx3(e.target.value)
    }
    
    if(!mounted) return <></>

    return(
      <>
     
      <div className='flex justify-evenly flex-col items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-2/6 h-4/5 rounded-md'>
          <div className='w-full  grow my-1 justify-center flex flex-col'>
            <div  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2">transaction count</div>
            <div className='h-full ml-6'>
               {transactionCountIsSuccess && <h1>{transactionCount1}</h1>}
            </div>
          </div>
         <div className='w-full  grow my-1 justify-center flex flex-col'>
          <div  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2">transaction details</div>
          <div className='h-full  my-1 flex justify-between'>
            <div className='w-3/6 flex items-center justify-center flex-col'>
                  <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white  dark:text-white">transaction index</label>
                    <input type="text" id="small-input" value={transactionIdx} onChange={handleChangeTransaction} className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" />
            </div>
                    <div className='w-3/6  py-3 text-white'>
                            to : ....{transactionDetail1?transactionDetail1[0].slice(30):"no address"}
                            <br />
                            value : {transactionDetail1?transactionDetail1[1] + " wei":"no value"}
                            <br />
                            data : {transactionDetail1?transactionDetail1[2] + " bytes":"no data"} 
                            <br />
                            req confirmations : {transactionDetail1?transactionDetail1[3]:"no data"}
                        </div>
            </div>
        </div>
          <div className='w-full  grow my-1 justify-center flex flex-col'>
            <div className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2">transaction confirmed by owner </div>
                <div className='h-full  my-1 flex justify-between'>
                    <div className='w-3/6 flex items-center justify-evenly flex-col'>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white dark:text-white">transaction index</label>
                            <input type="text" id="small-input" value={transactionIdx2} onChange={handleTransactionIdx2} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" />
                            <label htmlFor="small-input2" className="block mb-2 text-sm font-medium text-white dark:text-white">owner address</label>
                            <input type="text" id="small-input2" value={ownerAddress} onChange={handleOwnerAddress} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" />
                     </div>
                    <div className='w-3/6 text-white  flex items-center justify-center'>{isConfirmedIsSuccess && isConfirmed?"true":"false"}</div>
                </div>
            </div>
          <div className='w-full  grow my-1 justify-center flex flex-col'>
            <div className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2">required no of transaction needed to execute</div>
            <div className='h-full  my-1 flex justify-between'>
            <div className='w-3/6 flex items-center justify-evenly flex-col'>
                  <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-white dark:text-white">transaction Index</label>
                    <input type="text" id="small-input" value={transactionIdx3} onChange={handletransactionIdx3} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" />
            </div>
                    <div className='w-3/6 text-white flex items-center justify-center'>{transactionDetailIsSuccess3 && n2-n1}</div>
            </div>
            </div>
        
        </div>
        
      </>
    )
  }
  
  