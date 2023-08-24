import React from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './Header'
import Footer from './Footer'


export const Layout = ({ children }) => {
  return (
    <>
      <Toaster />
      <Header />
      {children}
      <Footer />
    </>
  )
}
