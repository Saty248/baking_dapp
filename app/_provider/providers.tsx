'use client';

import React from 'react'
import WagmiProvider from './wagmiProvider';
import AuthContext from './sessionProvider'

export default function Providers({ children }: ProviderType) {
    return (
        <WagmiProvider>
            <AuthContext>
         {children}
         </AuthContext>
        </WagmiProvider>
      );
}
