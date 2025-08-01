"use client";
import AuthComponent from '@/components/AuthComponent';
import React from 'react'

function page() {
  return (
    <div className="bg-[#151515] min-h-screen flex text-white w-full justify-evenly gap-4">
        <div className='d1 w-1/2 h-screen p-8 flex'>
            <img src="assets/auth.png" alt="Auth pic" />
        </div>        
        <div className='d2 w-1/2 h-screen p-8 flex items-center justify-center'>
            <AuthComponent/>
        </div>
    </div>
  )
}

export default page
