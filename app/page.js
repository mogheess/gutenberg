'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Library, Sparkles } from 'lucide-react';
import Link from "next/link";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-50 via-slate-50 to-indigo-50">
      {/* Transparent Header */}
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

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-32 pb-20">
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

          {/* Search Bar */}
          <motion.div 
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative py-4">
              <input 
                type="text"
                placeholder="Enter a book ID or search by title..."
                className="w-full px-6 py-4 rounded-xl border bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link href="/dashboard">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Search Now
          </button>
          </Link>
          </motion.div>
         
      
         

          {/* Feature Cards */}
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
      </main>

    </div>
  );
}