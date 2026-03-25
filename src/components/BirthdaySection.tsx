import React from 'react';
import { motion } from 'framer-motion';

export default function BirthdaySection() {
  return (
    <section className="min-h-[70vh] w-full flex items-center justify-center px-6 relative py-20 bg-gradient-to-t from-peach-100/50 to-transparent">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center group"
      >
        <p className="text-xl md:text-2xl text-rose-400 font-inter mb-6 uppercase tracking-widest font-medium">
          The day someone incredibly special was born.
        </p>
        
        <div className="relative inline-block mb-8">
          <motion.div 
            animate={{ 
              textShadow: [
                "0px 0px 10px rgba(244,63,94,0.3)",
                "0px 0px 20px rgba(244,63,94,0.6)",
                "0px 0px 10px rgba(244,63,94,0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl md:text-8xl font-dancing-script text-rose-600 font-bold"
          >
            April 18th
          </motion.div>
          <div className="absolute -inset-4 bg-rose-200/20 rounded-full filter blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
        </div>

        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-3xl md:text-5xl font-dancing-script text-rose-500 mt-6"
        >
          Happy Birthday babe ❤️
        </motion.h3>
      </motion.div>
    </section>
  );
}
