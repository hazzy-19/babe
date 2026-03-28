import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function SurpriseButton() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-center pb-32 pt-16 bg-transparent relative z-50">
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: "0dvh", borderTopLeftRadius: "100%", borderTopRightRadius: "100%", opacity: 0.9 }}
            animate={{ height: "100dvh", borderTopLeftRadius: "0%", borderTopRightRadius: "0%", opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.45, 0, 0.15, 1] }}
            className="fixed bottom-0 left-0 w-full bg-red-700 z-[100] flex flex-col items-center justify-center overflow-hidden shadow-[0_-20px_50px_rgba(185,28,28,0.5)]"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.5 }}
              className="text-center"
            >
              <h4 className="text-6xl md:text-8xl font-dancing-script text-white tracking-wide drop-shadow-2xl">
                I love you ❤️
              </h4>
              <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 3, duration: 2 }}
                 className="mt-6 text-xl text-red-200 font-inter"
              >
                 Forever and always.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!revealed && (
          <motion.button
            key="btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRevealed(true)}
            className="px-8 py-4 bg-rose-500 text-white rounded-full font-inter font-medium shadow-xl hover:bg-rose-600 hover:shadow-rose-500/30 transition-all flex items-center gap-2 cursor-pointer z-10"
          >
            <span>One more thing…</span>
            <Heart className="w-5 h-5 fill-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
