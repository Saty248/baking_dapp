'use client'
import React from 'react'
import { useAccount } from "wagmi";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { ethers } from "ethers";
import { parseEther } from "viem";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { depositCode, depositAbi } from "../../constants/abi_byteCode";
import {abi} from '../../constants/index'
import Link from 'next/link';



export default function Fd() {
  const [mounted,setMounted]=React.useState(false);

   
  React.useEffect(() => setMounted(true), []);
  
  return (
    <>
       <div className='flex flex-col justify-evenly items-center  w-full p-10 max-h-screen h-93vh bg-gradient-to-r from-slate-500 to-slate-800'>
          <div className='w-3/6 h-1/6 rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-1'>
            <div className='flex h-full w-full items-center justify-center bg-gray-800 back '>
            <h1
  className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500"
>
  FIXED DEPOSIT RATES
  <br />
  UPTO 15 SECS  - O% INTEREST
  <br />
  FROM 15SEC T0 30 SEC - 4% INTEREST
  <br />
  FROM 30SEC - 8% INTEREST
</h1>
            </div>
          </div>
          <div className='h-36 w-2/6 rounded-md bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 p-1'>
           <Link href={"http://localhost:3000/FixedDeposit/CreateFd"}> <button className='flex h-full w-full items-center justify-center bg-gray-800 back hover:bg-gradient-to-r from-slate-500 to-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300'>
              <h1 className='text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-800 to-gray-500 '>CREATE A FIXED DEPOSIT</h1>
            </button></Link>
          </div>
          <div className='h-36 w-2/6 rounded-md bg-gradient-to-r from-rose-500 via-red-400 to-red-500 p-1'>
           <Link href={"http://localhost:3000/FixedDeposit/YourFd"}> <button className='flex h-full w-full items-center justify-center bg-gray-800 back hover:bg-gradient-to-r from-slate-500 to-slate-800 focus:outline-none focus:ring-4 focus:ring-gray-300'>
              <h1 className='text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>YOUR FIXED DEPOSITS</h1>
            </button></Link>
          </div>
       </div>
       </>
  )
}

