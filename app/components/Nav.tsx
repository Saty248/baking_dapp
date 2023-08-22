'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import SignInBtn from './SignInBtn'


export default function Nav() {
  
  
 
    const pathname = usePathname()
   console.log(pathname)
  return (
    <>
    
<nav className=" border-gray-200">
  <div className="w-full flex flex-wrap items-center justify-between m-auto p-4">
  <Link href="/" className="flex items-center ">
       <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">BANKING DAPP</span>
  </Link>
  <div className="flex md:order-2">
    <SignInBtn/>
     
      <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
      <li key={1}>
        <Link key={1} href="/" className={pathname=='/'? 'text-red-600 block py-2 pl-3 pr-4    md:p-0 ':'text-white block py-2 pl-3 pr-4 md:hover:text-violet-400   md:p-0 '}  aria-current="page">Home</Link>
      </li>
      
      <li key={2}>
        <Link key={1} href="/FixedDeposit" className= {pathname=='/FixedDeposit'?'text-red-600 block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0':'text-white rounded hover:bg-gray-100 md:hover:bg-transparent block py-2 pl-3 pr-4 md:hover:text-violet-400 md:p-0'} >FixedDeposit</Link>
      </li>
      <li key={3}>
        <Link key={1} href="/Vaults" className= {pathname=='/Vaults'?'text-red-600 block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0':'text-white rounded hover:bg-gray-100 md:hover:bg-transparent block py-2 pl-3 pr-4 md:hover:text-violet-400 md:p-0'}>Vaults</Link>
      </li>
      <li key={4}>
        <Link key={1} href="/Loan" className= {pathname=='/Loan'?'text-red-600 block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0':'text-white rounded hover:bg-gray-100 md:hover:bg-transparent block py-2 pl-3 pr-4 md:hover:text-violet-400  md:p-0'}>loan</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>

    </>
  )
}
