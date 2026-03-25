import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function SurpriseButton() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center pb-32 pt-16 bg-rose-100">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.button
            key="btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRevealed(true)}
            className="px-8 py-4 bg-rose-500 text-white rounded-full font-inter font-medium shadow-xl hover:bg-rose-600 hover:shadow-rose-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>One more thing…</span>
            <Heart className="w-5 h-5 fill-white" />
          </motion.button>
        ) : (
          <motion.div
            key="msg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.h4 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl md:text-8xl font-dancing-script text-rose-600 tracking-wide drop-shadow-sm"
            >
              I love you ❤️
            </motion.h4>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
