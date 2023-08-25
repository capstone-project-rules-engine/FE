import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='w-ful sticky top-0 bg-white dark:bg-dark shadow-sm z-20 flex flex-col justify-center md:justify-between px-8 overflow-x-hidden'>
      <div className='flex justify-start'>
        {' '}
        {/* Change justify-between to justify-start */}
        <h1 className='block text-xl font-extrabold'>
          <NavLink to={'/'}>Rule Engine</NavLink>
        </h1>
      </div>
    </nav>
  )
}

export default Header
