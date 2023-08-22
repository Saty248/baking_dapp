"use client";
import React from "react";
import { useAccount } from "wagmi";
import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import { ethers } from "ethers";
import { parseEther } from "viem";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,useWaitForTransaction
} from "wagmi";

import {fd_abi,fd_address} from '../../../constants/fd_address_abi'
import { write } from "fs";

export default function CreateFd() {
  const [mounted, setMounted] = React.useState(false);
  const { address} = useAccount();
  const {data:noOfTxs}:wagmiRead = useContractRead({
    address: fd_address,
    abi: fd_abi,
    functionName: 'client_txs',
    watch:true,
    args: [],
    account:address
  }) 
  let sendEth; 
  console.log(noOfTxs)
  console.log(typeof noOfTxs)
  let noOfTxs_string=noOfTxs?.toString()



  const [transactionIdx1, settransactionIdx1] = React.useState("");

  const {data:matureTimeData,isError:matureTimeError}:wagmiRead = useContractRead({
    address: fd_address,
    abi: fd_abi,
    functionName: 'timeToMature',
    watch:true,
    args: [transactionIdx1],
    account:address
  })

  console.log(matureTimeData)
  let matureTimeData_string=matureTimeData?.toString();
console.log(matureTimeError)
  const [transactionIdx2, settransactionIdx2] = React.useState("");
  const {data:writedata_withDrawFund,error:error1,write:withDrawFundwrite,isError:withDrawFundeError,isLoading:LoadwithDrawFund, isSuccess} = useContractWrite({
    address: fd_address,
    abi: fd_abi,
    functionName: 'withDrawFund',
   
    args: [transactionIdx2],
    account:address
  })
  const{isLoading:loading1,isSuccess:success1}=useWaitForTransaction({
    hash: writedata_withDrawFund?.hash,
    onSuccess() {
    console.log("success")
    },
  })
 
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  const handleChangetimeToMature = (e: ChangeEvent<HTMLInputElement>) => {
    settransactionIdx1(e.target.value);
  };

  const handleChangevalue_matureTime = (e: ChangeEvent<HTMLInputElement>) => {
    settransactionIdx2(e.target.value);
  };

  const handleClickWrite=async()=>{
    withDrawFundwrite();
  }

  return (
    <>
      <div className="flex  h-93vh justify-evenly items-center flex-col">
        <div className="w-3/6 h-1/6 rounded-md bg-gradient-to-r from-rose-500 via-red-400 to-red-500 p-1">
          <div className="flex h-full w-full items-center justify-center bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-rose-500 via-red-400 to-red-500">
            Here are the IDs for your FDs .
              <br />
              *(id - 0  is deafault id. any transaction with id 0 might result in ether loss)
              <br />
              {noOfTxs_string?noOfTxs_string:"no fd"}
            </h1>
          </div>
        </div>
        <div className="w-3/6 h-1/6 rounded-md bg-gradient-to-r from-blue-400 to-emerald-400 p-1">
          <div className="flex h-full w-full items-center justify-evenly bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              time to mature for the FD ID
            </h1>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                transaction index
              </label>
              <input
                type="text"
                id="small-input"
                value={transactionIdx1}
                onChange={handleChangetimeToMature}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
             
            {matureTimeData_string?matureTimeData_string:""}
            </h1>
          </div>
        </div>
        
        <div className="w-3/6 h-1/6 rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-1">
          <div className="flex h-full w-full items-center justify-evenly bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              Withdraw maturity amount
            </h1>
            

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                transaction index
              </label>
              <input
                type="text"
                id="small-input"
                value={transactionIdx2}
                onChange={handleChangevalue_matureTime}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button onClick={handleClickWrite} className="px-6 py-2 text-blue-700 rounded bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 mt-8 ">
              Button
            </button>
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              {" "}
             {LoadwithDrawFund &&  "transaction queued"}
             <br />
             {isSuccess && "successfull"} {withDrawFundeError && "error"} {loading1 && "verifying"}
             <br />
             {success1 && "verified"}

            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
