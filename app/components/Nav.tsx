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
    
<nav className="bg-white border-gray-200">
  <div className="w-full flex flex-wrap items-center justify-between m-auto p-4">
  <Link href="/" className="flex items-center ">
       <span className="self-center text-2xl font-semibold whitespace-nowrap ">nav auth</span>
  </Link>
  <div className="flex md:order-2">
    <SignInBtn/>
     
      <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
      <li>
        <Link href="/" className={pathname=='/'? 'text-red-600 block py-2 pl-3 pr-4    md:p-0 ':'text-blue-600 block py-2 pl-3 pr-4    md:p-0 '}  aria-current="page">Home</Link>
      </li>
      <li>
        <Link href="/about" className={pathname=='/about'?'text-red-600  block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 ':'text-blue-600  block py-2 pl-3 pr-4  rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 '}>About</Link>
      </li>
      <li>
        <Link href="#" className= {pathname=='/services'?'text-red-600 block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0':'text-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent block py-2 pl-3 pr-4 md:hover:text-blue-700 md:p-0'} >Services</Link>
      </li>
      <li>
        <Link href="#" className= {pathname=='/contact'?'text-red-600 block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0':'text-blue-600 rounded hover:bg-gray-100 md:hover:bg-transparent block py-2 pl-3 pr-4 md:hover:text-blue-700 md:p-0'}>Contact</Link>
      </li>
    </ul>
  </div>
  </div>
</nav>

    </>
  )
}
