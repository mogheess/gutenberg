import React from 'react'

const Navbar = () => {
  return (
    <header className="p-4 md:p-6">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-secondary">BookVerse</Link>
      <nav>
        <Button variant="ghost" className="text-secondary hover:text-primary">Login</Button>
      </nav>
    </div>
  </header>
  )
}

export default Navbar