'use client'
import { useSession } from "next-auth/react"
import React from "react";
import { SiweMessage } from "siwe";
import { polygonMumbai,sepolia} from "viem/chains";
import { useAccount, useSignMessage,useDisconnect } from "wagmi";
import { Web3Modal, useWeb3Modal } from "@web3modal/react";
import { getCsrfToken, signIn,signOut } from "next-auth/react";

const SignInBtn=()=>{
    const [mounted,setMounted]=React.useState(false);

    const {address,isConnected}=useAccount();
    const {open}=useWeb3Modal()
    const { disconnectAsync } = useDisconnect();
    const handleSignout = async () => {
      disconnectAsync();
      signOut({callbackUrl:"/"});
    };
    const {signMessageAsync}=useSignMessage()
    const [hasSigned, setHasSigned] = React.useState(false);
    const { data: session, status } = useSession()

    console.log(session);
    console.log(status)
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
           
           setHasSigned(true)
            const response = await signIn("web3", {
                message: JSON.stringify(message),
                signedMessage,
                redirect: true,
                callbackUrl: '/'
              });
              if (response?.error) {
                console.log("Error occured:", response.error);
              }
              console.log(response)
        
        }catch(e){
            console.log("Error Occured", e);

        }
        
    }
console.log(hasSigned);

    return (
        <>
        {!isConnected && (
        <>
            <button
          className="rounded-lg py-2 px-4 bg-blue-700 hover:border hover:border-blue-700 hover:bg-transparent"
          onClick={async () =>{
             await open();
             await handleSign();
          } }
        >
          Connect Wallet
        </button>
        </>)}
        {console.log(hasSigned)}
        {isConnected && status=='unauthenticated' &&(
            <>
            <button
            className="rounded-lg py-2 px-4 mt-2 bg-violet-700 hover:border hover:border-violet-700 hover:bg-transparent"
            onClick={handleSign}
          >
            Sign Message to Login
          </button>
            
            </>
        )}
        {isConnected && status=='authenticated' && (
        <button
        className="rounded-lg py-2 px-4 mt-2 bg-violet-700 hover:border hover:border-violet-700 hover:bg-transparent"
        onClick={handleSignout} 
      >
        disconnect
      </button>
      )}
        </>
    )


}
export default SignInBtn;
