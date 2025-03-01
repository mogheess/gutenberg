import React from 'react'
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className={"w-full transition-all duration-300 bg-transparent"}>
    <div className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
    
        <div className="flex items-center space-x-2">
         <span className="font-bold text-xl text-gray-900">Project Gutenberg</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
          </Link>
         
        </nav>
      </div>
    </div>
  </header>
  )
}

export default Navbar