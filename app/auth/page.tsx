'use client'

import React from "react";
import { SiweMessage } from "siwe";
import { polygonMumbai,sepolia} from "viem/chains";
import { useAccount, useSignMessage } from "wagmi";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { getCsrfToken, signIn } from "next-auth/react";

const AuthPage=()=>{
    const [mounted,setMounted]=React.useState(false);

    const {address,isConnected}=useAccount();
    const {open}=useWeb3Modal()

    const {signMessageAsync}=useSignMessage()
    const [hasSigned, setHasSigned] = React.useState(false);

    React.useEffect(() => setMounted(true), []);
    if(!mounted) return <></>

    const handleSign=async()=>{
        if(!isConnected) open();

        try{
            const message=new SiweMessage({
                domain: window.location.host,
        uri: window.location.origin,
        version: "1",
        address: address as `0x${string}`,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: await getCsrfToken(),
        chainId: sepolia.id
            })

            const signedMessage=await signMessageAsync({message:message.prepareMessage()})
            setHasSigned(true);

            const response = await signIn("web3", {
                message: JSON.stringify(message),
                signedMessage,
                redirect: true,
                callbackUrl: '/'
              });
              if (response?.error) {
                console.log("Error occured:", response.error);
              }
        
        }catch(e){
            console.log("Error Occured", e);

        }
        
    }


}