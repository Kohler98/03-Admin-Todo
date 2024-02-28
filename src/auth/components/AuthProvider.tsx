'use client';

import { SessionProvider } from "next-auth/react";

interface Props{
    children:React.ReactNode
}
export const AuthProvider:React.FC<Props> = ({children,...rest}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}
