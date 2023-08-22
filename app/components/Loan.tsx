"use client";
import React from "react";
import { useAccount } from "wagmi";
import { FormEvent, FormEventHandler, useEffect, useState,ChangeEvent } from "react";
import { ethers } from "ethers";
import { parseEther } from "viem";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";
import { depositCode, depositAbi } from "../../constants/abi_byteCode";
import { abi } from "../../constants/index";
import Link from "next/link";
import {loan_abi,loan_address} from "../../constants/loan_abi_address"
export default function Loan() {
  let inputEth:any;
  const [mounted, setMounted] = React.useState(false);
  const {address}=useAccount()
  const [nftaddress1,setnftAddress1]=React.useState("")
  const [tokenId1,settokenId1]=React.useState("")
  const [amt1,setAmt1]=React.useState("");
  const {data:writedata_giveLoan,error:error1,write:giveLoanwrite,isError:giveLoanError,isLoading:LoadgiveLoan, isSuccess:successgiveLoan} = useContractWrite({
    address: loan_address,
    abi: loan_abi,
    functionName: 'giveLoan',
       
    account:address
  })
  const{isLoading:loading1,isSuccess:success1}=useWaitForTransaction({
    hash: writedata_giveLoan?.hash,
    onSuccess() {
    console.log("success")
    },
  })


  const [nftaddress2,setnftAddress2]=React.useState("")  
  const [tokenId2,settokenId2]=React.useState("")
  const [amt2,setAmt2]=React.useState("");
  const {data:writedata_collectLoan,error:error2,write:collectLoanwrite,isError:collectLoanError,isLoading:LoadcollectLoan, isSuccess:successcollectLoan} = useContractWrite({
    address: loan_address,
    abi: loan_abi,
    functionName: 'collectLoan',
       value:parseEther(amt2),
    account:address
  })
  const{isLoading:loading2,isSuccess:success2}=useWaitForTransaction({
    hash: writedata_collectLoan?.hash,
    onSuccess() {
    console.log("success")
    },
  })


  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <></>;
  const handleChangeNftaddress1=(e: ChangeEvent<HTMLInputElement>)=>{
    setnftAddress1(e.target.value)
  }
  const handleChangetokenId1=(e: ChangeEvent<HTMLInputElement>)=>{
    settokenId1(e.target.value)
  }
  const handleChangeamt1=(e: ChangeEvent<HTMLInputElement>)=>{
        setAmt1(e.target.value)
        inputEth=BigInt(parseEther(amt1))
        console.log()
       

    
   
  }
  const handleClickGiveLoan=async ()=>{
    giveLoanwrite({
      args:[nftaddress1,tokenId1,BigInt(parseEther(amt1))]
    });
  }

  const handleChangeamt2=(e: ChangeEvent<HTMLInputElement>)=>{
    setAmt2(e.target.value)
  }
  const handleClickCollect=async ()=>{
    collectLoanwrite();
  }

  return (
    <>
      <div className="flex bg-gradient-to-r  from-slate-400 to-slate-700 h-93vh justify-evenly items-center flex-col">
        <div className="w-4/6 h-1/6 rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-1">
          <div className="flex h-full w-full items-center justify-center bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-center">
            transfer the ownership of the nft to 0x083CdDe8Bb5CB09Da1E67A1686f54d1433b627eD. 
              
            </h1>
          </div>
        </div>
        <div className="w-4/6 h-2/6 rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-1">
          <div className="flex h-full w-full items-center justify-evenly bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
             check the ownership of the nft
            </h1>
            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                nft address
              </label>
              <input
                type="text"
                id="small-input"
                value={nftaddress1}
                onChange={handleChangeNftaddress1}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                token iD
              </label>
              <input
                type="text"
                id="small-input"
                value={tokenId1}
                onChange={handleChangetokenId1}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
               loan amount in ethers
              </label>
              <input
                type="text"
                id="small-input"
                value={amt1}
                onChange={handleChangeamt1}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button onClick={handleClickGiveLoan} className="px-6 py-2 text-blue-700 rounded bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 mt-8 ">
              Button
            </button>
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
             
            {LoadgiveLoan &&  "transaction queued"}
             <br />
             {successgiveLoan && "successfull"} {giveLoanError && "error enter valid token or address"} {loading1 && "verifying"}
             <br />
             {success1 && "verified"}
            </h1>
          </div>
        </div>
        
        <div className="w-4/6 h-1/6 rounded-md bg-gradient-to-r from-teal-400 to-yellow-200 p-1">
          <div className="flex h-full w-full items-center justify-evenly bg-gray-800 back ">
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              give back loan amount
            </h1>
            

            <div className="flex flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                amount
              </label>
              <input
                type="text"
                id="small-input"
                value={amt2}
                onChange={handleChangeamt2}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button onClick={handleClickCollect} className="px-6 py-2 text-blue-700 rounded bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 mt-8 ">
              Button
            </button>
            <h1 className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
              {" "}
             {LoadcollectLoan &&  "transaction queued"}
             <br />
             {successcollectLoan && "successfull"} {collectLoanError && "error give correct amt"} {loading2 && "verifying"}
             <br />
             {success2 && "verified"}

            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
