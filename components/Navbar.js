import React from 'react'

const Navbar = () => {
  return (
    <header className={"w-full transition-all duration-300 bg-transparent"}>
    <div className="container mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl text-gray-900">Gutenberg Explorer</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Get Started
          </button>
        </nav>
      </div>
    </div>
  </header>
  )
}

export default Navbar