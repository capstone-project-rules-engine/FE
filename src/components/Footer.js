import React from 'react'
import { FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex flex-col justify-between px-8 py-4 overflow-hidden text-lg md:flex-row md:text-title'>
      <div className='flex items-center justify-center'>
        <h1 className='text-sm text-center md:text-lg'>
          &copy;2023 Rule Engine
        </h1>
      </div>
      <div className='flex flex-row items-center justify-center'></div>
    </div>
  )
}

export default Footer
