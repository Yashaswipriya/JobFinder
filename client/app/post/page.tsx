"use client";
import Header from '@/Components/Header'
import JobForm from '@/Components/JobPost/JobForm'
import { useGlobalContext } from '@/context/globalContext'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function Page() {
  const {isAuthenticated,loading} = useGlobalContext();
  const router = useRouter();
   useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("https://jobfinder-31ca.onrender.com/login");
    }
  }, [isAuthenticated,loading,router]);

  return (
    <div>
      <Header/>
      <h2 className='flex-1 pt-8 mx-auto w-[90%] text-3xl font-bold text-black'>
        Create a Job Post
      </h2>
      <div className='flex-1 pt-8 w-[90%] mx-auto flex justify-center items-center'>
        <JobForm/>
      </div>
    </div>
  )
}

export default Page
