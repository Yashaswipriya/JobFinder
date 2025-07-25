"use client"
import React from 'react'
import  Link  from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useGlobalContext } from '@/context/globalContext';
import { LogIn, UserPlus } from 'lucide-react';
import Profile from './Profile';

function Header() {
    const {isAuthenticated, userProfile} = useGlobalContext();
    const pathname = usePathname();
  return (
    
    <header className='px-10 py-6 bg-[#D7DEDC] text-gray-500 flex justify-between items-center'>
      <Link href = {'/'} className='flex items-center gap-2'>
      <Image
      src={'/logo.svg'}
        alt='Logo'
        width={45}
        height={45}
      />
      <h1 className='font-extrabold text-2xl text-[#7263f3]'>JobFinder</h1>
      </Link>
      <ul className='flex items-center gap-8'>
      <li>
        <Link href ={"/findwork"} className={`py-2 px-6
            ${pathname === '/findwork' ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3/10]"
            :""}`}>
            Find Work</Link>
        <Link href ={"/myjobs"} className={`py-2 px-6
            ${pathname === '/myjobs' ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3/10]"
            :""}`}>
            My Jobs</Link>
        <Link href ={"/post"} className={`py-2 px-6 
            ${pathname === '/post' ? "text-[#7263F3] border-[#7263F3] border bg-[#7263F3/10]"
            :""}`}>
            Post a Job</Link>
      </li>
      </ul>
      <div className='flex items-center gap-4'>
        {isAuthenticated ?(
           <Profile/>) : (
            <div className='flex items-center gap-6'>
                <a href={'https://jobfinder-31ca.onrender.com/login'}
                className='rounded-md border flex items-center gap-4 bg-[#7263f3] border-[#7263f3] text-white py-2 px-6 hover:bg-[#7263f3]/90 transition-all duration-200 ease-in-out'
                >
                <LogIn className='w-4 h-4'/>
                Login</a>
                 <a href={'https://jobfinder-31ca.onrender.com/login'}
                className='rounded-md border flex items-center gap-4 border-[#7263F3] text-[#7263F3] py-2 px-6 hover:bg-[#7263F3]/10 transition-all duration-200 ease-in-out'
                >
                <UserPlus className='w-4 h-4'/>
                Register</a>
            </div>)}
      </div>
    </header>
  )
}

export default Header

