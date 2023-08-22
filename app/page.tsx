import Image from 'next/image'
import IdexDtl from './components/IdexDtl'
import './globals.css'
export default function Home() {
  let item=[[
    "-> to connect and authenticate",
    "-> connect your wallet",
    "-> click on connect wallet",
    "-> sign the sign-in message to authenticate",
    "-> to disconnect and sign out",
    "-> click on the disconnect button"
  ],[
    "2",
    "create an FD",
    "connect your wallet",
    "sign the message to authenticate",
  ],[
    "3",
    "take loan by giving your nft to the contract",
    "pay the loan and get back the nft",
  ]]
  return (
    <main className='h-93vh space-x-24 flex items-center justify-center  text-3xl font-bold'>
    <IdexDtl
        key={1}
          header="authentication"
          body={
            item[0]
          }
        />
        
    </main>
  )
}
