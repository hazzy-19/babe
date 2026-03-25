import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ onScrollDown }: { onScrollDown: () => void }) {
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Soft background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-pulse" />
      <div className="absolute top-40 right-10 w-64 h-64 bg-peach-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute -bottom-8 left-40 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-60 animate-pulse" style={{ animationDelay: '4s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-10 text-center flex flex-col justify-center items-center"
      >
        <h1 className="text-6xl md:text-8xl font-dancing-script text-rose-500 mb-4 drop-shadow-sm">
          Hey babe ❤️
        </h1>
        <p className="text-xl md:text-2xl text-rose-400 font-inter mb-12 italic">
          I made something for you...
        </p>

        <motion.button
          onClick={onScrollDown}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex flex-col items-center justify-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 px-8 py-4 rounded-full shadow-lg text-rose-500 font-medium transition-all hover:bg-white/60 hover:shadow-xl hover:-translate-y-1"
        >
          <span>Open it</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
}
