'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Library, Sparkles } from 'lucide-react';
import Link from "next/link";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-50 via-slate-50 to-indigo-50">
      
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">   
          <Hero />   
      </main>

    </div>
  );
}