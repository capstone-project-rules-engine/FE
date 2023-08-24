import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='w-ful sticky top-0 bg-white dark:bg-dark shadow-sm z-20 flex flex-col justify-center md:justify-between px-8 overflow-x-hidden'>
      <div className='flex justify-between'>
        <h1 className='block text-xl font-extrabold'>Rule Engine</h1>
        <NavLink to={'/'}>
          Home
        </NavLink>
      </div>


    </nav>
  )
}


export default Header