import React from 'react';
import { motion } from 'framer-motion';

export default function IntroSection() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5 }}
        className="max-w-2xl mx-auto text-center z-10 p-8 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-xl"
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-4xl md:text-5xl font-dancing-script text-rose-600 mb-8"
        >
          Since 8th September…
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-stone-700 font-inter leading-relaxed space-y-6"
        >
          <p className="font-medium text-rose-500 text-2xl mb-6">We've been together for 6 months.</p>
          <p>that's like half a year, i think, but nkianza kuelezeana about all this to someone, they might
            think we've been together for years or atleast i was in the friendzone for long enough that you
            decided to release me. Nataka kuyap hapa but niliambiwa na msee flani TIktok, card inafaa ikuwe short. </p>
          <p>And as you well know Tiktok is always right, here's a little something to remind you of how incredibly special you are to me.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
