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
  useWaitForTransaction,useBalance
} from "wagmi";

import {vault_abi,vault_address} from '../../../constants/vaultMonitor_abi_byteCode';
import ReadButtons from '@/app/components/ReadButtons';
import WriteButtons from '@/app/components/WriteButtons';

export default function page({params}:{params:{MyVault:string}}) {
  const [mounted,setMounted]=React.useState(false);
  
  const { address} = useAccount();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const myVaultAddress=params.MyVault
  console.log(myVaultAddress)

  
  React.useEffect(() => setMounted(true), []);


  
  if(!mounted) return <></>
  return (
     <><div className='flex justify-evenly items-center  w-full p-10 max-h-screen h-93vh bg-gradient-to-r from-slate-900 to-slate-700'>
      <ReadButtons MyVault={myVaultAddress}/>
      <div className='flex justify-center items-center bg-white-500 w-2/6'>
      
      </div>
      <WriteButtons MyVault={myVaultAddress}/>
      </div></>
  )
}
