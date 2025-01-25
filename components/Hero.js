import React from 'react'
import { motion } from 'framer-motion';
import { Search, BookOpen, Library, Sparkles } from 'lucide-react';
import Link from 'next/link'

const Hero = () => {
  return (
   <div className="flex flex-col items-center text-center space-y-8">
     <motion.h1 
    className="text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    Project Gutenberg
  </motion.h1>

  <motion.p 
    className="text-xl text-gray-600 max-w-2xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    A platform to download and access free e-books online
  </motion.p>

  {/* search clickbait */}
  <motion.div 
    className="w-full max-w-2xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    <div className="relative py-4">
      <input 
        type="text"
        placeholder="Search by book ID or search by title..."
        className="w-full px-6 py-4 rounded-xl border bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />
      <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    <Link href="/dashboard">
  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
        Get Started
  </button>
  </Link>
  </motion.div>


{/*3 features */}
  <motion.div 
            className="grid md:grid-cols-3 gap-8 w-full max-w-4xl mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { icon: Library, title: 'Vast Library', desc: 'Access to thousands of classic books' },
              { icon: Sparkles, title: 'AI Analysis', desc: 'Get instant insights and summaries' },
              { icon: BookOpen, title: 'Easy Reading', desc: 'Comfortable reading experience' }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border hover:shadow-lg transition-all group"
              >
                <feature.icon className="h-8 w-8 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
   </div>
         
  )
}

export default Hero