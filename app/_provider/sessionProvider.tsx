'use client'

import {SessionProvider} from 'next-auth/react'

export default function AuthContext({children}:SessionProps){
    return <SessionProvider>{children}</SessionProvider>
}