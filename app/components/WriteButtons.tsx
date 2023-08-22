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
  useWaitForTransaction,
} from "wagmi";
import { Console } from "console";
import {
  vault_abi,
  vault_address,
  myVault_abi,
} from "../../constants/vaultMonitor_abi_byteCode";

export default function WriteButtons({ MyVault }: { MyVault: string }) {
  const [mounted, setMounted] = React.useState(false);

  const { address } = useAccount();
  console.log(address);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const myVaultAddress = MyVault as `0x${string}`;
  console.log(myVaultAddress);

  const {
    data: transactionCount,
    isSuccess: transactionCountIsSuccess,
    refetch,
  } = useContractRead({
    address: myVaultAddress,
    abi: myVault_abi,
    functionName: "getTransactionCount",
    watch: true,
  });
  console.log(transactionCount);

  let transactionCount1 = 0;
  if (transactionCount) {
    transactionCount1 = parseInt(transactionCount.toString());
  }
  console.log(transactionCount1);

  const [transactionIdx, settransactionIdx] = React.useState("");
  const {
    data: writeDataConfirmTransaction,
    write: writeConfirmTransaction,
    isError: confirmTransactionError,
    isSuccess: confirmTransactionSuccess,
    isLoading: confirmTransactionLoad,
  } = useContractWrite({
    address: myVaultAddress,
    abi: myVault_abi,
    functionName: "confirmTransaction",
    account: address,
  });
  const {
    data: data1,
    isError: isError1,
    isLoading: isLoading1,
    isSuccess: confirmTransactionHashSuccess,
  } = useWaitForTransaction({
    hash: writeDataConfirmTransaction?.hash,
    onSuccess() {
      console.log("sucess confTrans");
    },
  });

  console.log(data1, isError1, isLoading1);

  const [transactionIdx1, settransactionIdx1] = React.useState("");
  const {
    data: writeDataExecuteTransaction,
    write: writeExecuteTransaction,
    isError: executeTransactionError,
    isSuccess: executeTransactionSuccess,
    isLoading: executeTransactionLoad,
  } = useContractWrite({
    address: myVaultAddress,
    abi: myVault_abi,
    functionName: "executeTransaction",
    account: address,
  });
  const {
    data: data2,
    isError: isError2,
    isLoading: isLoading2,
    isSuccess: executeTransactionHashSuccess,
  } = useWaitForTransaction({
    hash: writeDataExecuteTransaction?.hash,
    onSuccess() {
      console.log("sucess confTrans");
    },
  });

  console.log(data2, isError2, isLoading2);

  const [transactionIdx3, settransactionIdx3] = React.useState("0");
  const { data: transactionDetail3, isSuccess: transactionDetailIsSuccess3 } =
    useContractRead({
      address: myVaultAddress,
      abi: myVault_abi,
      functionName: "getTransaction",
      args: [transactionIdx3],
      watch: true,
    });
  console.log(transactionDetail3);
  const { data: reqConf, isSuccess: reqConfIsSuccess } = useContractRead({
    address: myVaultAddress,
    abi: myVault_abi,
    functionName: "numConfirmationsRequired",

    watch: true,
  });

  console.log(reqConf as string);
  let reqConf1 = reqConf?.toString();
  let transactionDetail13;

  let n1 = 0,
    n2 = 0;
  if (transactionCount) {
    transactionDetail13 = transactionDetail3?.toString().split(",");

    n1 = parseInt(transactionDetail13?.[4] as string);
    n2 = parseInt(reqConf1 as string);
    console.log(n2 - n1);
  }

  const [transactionIdx2, settransactionIdx2] = React.useState("");
  const {
    data: writeDataRevokeTransaction,
    write: writeRevokeTransaction,
    isError: RevokeTransactionError,
    isSuccess: RevokeTransactionSuccess,
    isLoading: RevokeTransactionLoad,
  } = useContractWrite({
    address: myVaultAddress,
    abi: myVault_abi,
    functionName: "revokeConfirmation",
    account: address,
  });
  const {
    data: data3,
    isError: isError3,
    isLoading: isLoading3,
    isSuccess: revokeTransactionHashSuccess,
  } = useWaitForTransaction({
    hash: writeDataRevokeTransaction?.hash,
    onSuccess() {
      console.log("sucess confTrans");
    },
  });

  console.log(data3, isError3, isLoading3);

  const [toAddress, setToAddress] = useState("");
  const [value, setValue] = useState("");
  const [submit_data, setSubmit_data] = useState("");
  const {
    data: writeDataSubmitTransaction,
    write: writeSubmitTransaction,
    isError: SubmitTransactionError,
    isSuccess: SubmitTransactionSuccess,
    isLoading: SubmitTransactionLoad,
  } = useContractWrite({
    address: myVaultAddress,
    abi: myVault_abi,
    functionName: "submitTransaction",
    account: address,
  });
  const {
    data: data4,
    isError: isError4,
    isLoading: isLoading4,
    isSuccess: submitTransactionHashSuccess,
  } = useWaitForTransaction({
    hash: writeDataSubmitTransaction?.hash,
    onSuccess() {
      console.log("sucess confTrans");
    },
  });

  console.log(data4, isError4, isLoading4);

  React.useEffect(() => setMounted(true), []);

  const handleChangeTransactionIdx = (e: ChangeEvent<HTMLInputElement>) => {
    settransactionIdx(e.target.value);
  };
  const handleClickConfirmTransaction = async () => {
    if (
      parseInt(transactionIdx) >= 0 &&
      parseInt(transactionIdx) < transactionCount1
    ) {
      console.log("clicked", transactionIdx);
      writeConfirmTransaction({
        args: [transactionIdx],
      });
    } else {
      console.log("clicked bt not valid", transactionIdx);
    }
  };

  const handleChangeTransactionIdx1 = (e: ChangeEvent<HTMLInputElement>) => {
    settransactionIdx1(e.target.value);
    settransactionIdx3(e.target.value);
  };
  const handleClickExecuteTransaction = async () => {
    if (
      parseInt(transactionIdx1) >= 0 &&
      parseInt(transactionIdx1) < transactionCount1 &&
      n2 - n1 == 0
    ) {
      console.log("clicked", transactionIdx1);
      writeExecuteTransaction({
        args: [transactionIdx1],
      });
    } else {
      console.log("clicked bt not valid", transactionIdx1);
    }
  };

  const handleChangeTransactionIdx2 = (e: ChangeEvent<HTMLInputElement>) => {
    settransactionIdx2(e.target.value);
    settransactionIdx3(e.target.value);
  };
  const handleClickRevokeTransaction = async () => {
    if (
      parseInt(transactionIdx2) >= 0 &&
      parseInt(transactionIdx2) < transactionCount1 &&
      n1 > 0
    ) {
      console.log("clicked", transactionIdx2);
      writeRevokeTransaction({
        args: [transactionIdx2],
      });
    } else {
      console.log("clicked bt not valid", transactionIdx2);
    }
  };

  const handleChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    setToAddress(e.target.value);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleChangeSubmit_data = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmit_data(e.target.value);
  };

  const handleClickSubmit = async () => {
    if (
      toAddress.length == 42 &&
      toAddress.substring(0, 2) == "0x" &&
      submit_data.substring(0, 2) == "0x" &&
      value.length > 0
    ) {
      console.log(
        "click",
        toAddress,
        value,
        submit_data,
        toAddress.substring(0, 2)
      );
    }
    writeSubmitTransaction({ args: [toAddress, value, submit_data] });
  };
  if (!mounted) return <></>;

  return (
    <>
      <div className="flex justify-evenly flex-col items-center bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-pink-500 to-90% w-2/6 h-4/5 rounded-md">
        <div className="w-full  grow my-1 justify-center flex flex-col">
          <button
            onClick={handleClickConfirmTransaction}
            className="text-white text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2 "
          >
            confirm Transaction
          </button>
          <div className="h-full  my-1 flex justify-between">
            <div className="w-3/6 flex items-center justify-center flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                transaction index
              </label>
              <input
                type="text"
                id="small-input"
                onChange={handleChangeTransactionIdx}
                value={transactionIdx}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-3/6  py-3 text-white">
              {confirmTransactionLoad && "loading transaction"}
              {confirmTransactionSuccess && "transaction successfull"}
              {confirmTransactionError && "error"}
              {confirmTransactionHashSuccess && "and verified"}
            </div>
          </div>
        </div>
        <div className="w-full  grow my-1 justify-center flex flex-col">
          <button
            onClick={handleClickExecuteTransaction}
            className="text-white text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2 "
          >
            execute Transaction
          </button>
          <div className="h-full  my-1 flex justify-between">
            <div className="w-3/6 flex items-center justify-center flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                transaction index
              </label>
              <input
                type="text"
                id="small-input"
                onChange={handleChangeTransactionIdx1}
                value={transactionIdx1}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-3/6  py-3 text-white">
              {executeTransactionLoad && "loading transaction"}
              {executeTransactionSuccess && "transaction successfull"}
              {executeTransactionError && "error"}
              {executeTransactionHashSuccess && "and verified"}
            </div>
          </div>
        </div>
        <div className="w-full  grow my-1 justify-center flex flex-col">
          <button
            onClick={handleClickRevokeTransaction}
            className="text-white text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2 "
          >
            revoke Transaction
          </button>
          <div className="h-full  my-1 flex justify-between">
            <div className="w-3/6 flex items-center justify-center flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                transaction index
              </label>
              <input
                type="text"
                id="small-input"
                onChange={handleChangeTransactionIdx2}
                value={transactionIdx2}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-3/6  py-3 text-white">
              {RevokeTransactionLoad && "loading transaction"}
              {RevokeTransactionSuccess && "transaction successful"}
              {RevokeTransactionError && "error"}
              {revokeTransactionHashSuccess && "and verified"}
            </div>
          </div>
        </div>
        <div className="w-full  grow my-1 justify-center flex flex-col">
          <button
            onClick={handleClickSubmit}
            className="text-white text-center bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium  text-sm px-5 py-2.5  mb-2 "
          >
            submit Transaction
          </button>
          <div className="h-full  my-1 flex justify-between">
            <div className="w-3/6 flex items-center justify-center flex-col">
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                to
              </label>
              <input
                type="text"
                value={toAddress}
                onChange={handleChangeTo}
                id="small-input"
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                value
              </label>
              <input
                type="text"
                id="small-input"
                value={value}
                onChange={handleChangeValue}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
              <label
                htmlFor="small-input"
                className="block mb-2 text-sm font-medium text-white  dark:text-white"
              >
                data
              </label>
              <input
                type="text"
                id="small-input"
                value={submit_data}
                onChange={handleChangeSubmit_data}
                className="block w-5/6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="w-3/6  py-3 text-white">
              {SubmitTransactionLoad && "loading transaction"}
              {SubmitTransactionSuccess && "transaction successfull"}
              {SubmitTransactionError && "error"}
              {isLoading4 && " verifying"}
              {submitTransactionHashSuccess && " and verified"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
