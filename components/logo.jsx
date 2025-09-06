import Link from 'next/link'
import React from 'react'

export default function Logo() {
  return (
      <Link href="/"><div className="flex items-center gap-1 px-2 py-1 ">
          <div className="relative w-16 h-14">
          {/* Briefcase body */}
          <div className="absolute inset-x-2 top-4 bottom-2 bg-amber-500 rounded-lg shadow-lg">
            {/* Briefcase handle */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-2 border-2 border-amber-500 rounded-t-lg bg-transparent"></div>

            {/* Briefcase lock */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-800 rounded-full animate-pulse"></div>

            {/* Briefcase divider line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-amber-300"></div>
          </div>

        </div>
        
        <div className="flex flex-col items-start">
            <span className="font-semibold text-lg text-amber-100">JobSphere</span>
            <span className="text-xs text-gray-50 -mt-1">Find Your Dream Job</span>
            </div>

          
        </div></Link>
  )
}
