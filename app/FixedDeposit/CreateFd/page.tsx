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
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";
import {fd_abi,fd_address} from '../../../constants/fd_address_abi'

//depositFund

export default function Vaults() {
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
  let sendEth:any; 
  console.log(noOfTxs)
  console.log(typeof noOfTxs)
  let noOfTxs_string=noOfTxs?.toString()
  const [transactionIdx1, settransactionIdx1] = React.useState("0");

  const [transactionIdx2, settransactionIdx2] = React.useState();

  const { data: writeDatadepositFund, write:writedepositFund ,isError, isLoading,isSuccess } = useContractWrite({
    address: fd_address,
    abi: fd_abi,
    functionName: "depositFund",
    args:[transactionIdx1],
    account: address,
    
  });
  const{isLoading:loading1,isSuccess:success1}=useWaitForTransaction({
    hash: writeDatadepositFund?.hash,
    onSuccess() {
    console.log("success")
    },
  })

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;

  const handleChangetimeToMature = (e: ChangeEvent<HTMLInputElement>) => {
    settransactionIdx1(e.target.value);
  };

  const handleChangevalue_amount = (e: ChangeEvent<HTMLInputElement>) => {
    sendEth=parseEther(e.target.value);
    console.log(sendEth);
  };

  const handleClickDeposit=async()=>{
    writedepositFund({value:sendEth});
  }

  return (
    <>
      <div className="flex bg-gradient-to-r  from-slate-400 to-slate-700 h-93vh justify-evenly items-center flex-col">
        <div className="w-3/6 h-1/6 rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-1">
          <div className="flex h-full w-full items-center justify-center bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-slate-500 to-yellow-100">
              
              Here are the IDs for your FDs
              <br />
              Ids with 0 are no longer in use.
              <br />
              {noOfTxs_string?noOfTxs_string:"no fd"}
            </h1>
          </div>
        </div>


        <div className="w-3/6 h-2/6 rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-1">
          <div className="flex h-full w-full items-center justify-evenly bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              deposit
            </h1>

            <div className="flex flex-col   ">
            <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                timePeriod
              </label>
              <input
                type="text"
                id="small-input"
                value={transactionIdx1}
                onChange={handleChangetimeToMature}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                amount
              </label>
              <input
                type="text"
                id="small-input"
                value={transactionIdx2}
                onChange={handleChangevalue_amount}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
              
            </div>
            <button onClick={handleClickDeposit} className="px-6 py-2 text-blue-700 rounded bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 mt-8 ">
              Button
            </button>
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              
              {isLoading && "transaction queued"}
              <br />
              {isSuccess && "successfull" }
              <br />
              {loading1 && "verifying"} {success1 && "verified"}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
