import React from 'react'
import { Toaster } from 'react-hot-toast'


export const Layout = ({children}) => {
  return (
    <>
    <Toaster/>
        {children}
    </>
  )
}
