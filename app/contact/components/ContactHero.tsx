'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from './animations';

export default function ContactHero() {
  return (
    <section className="bg-linear-to-br from-green-50 to-emerald-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="text-5xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6"
          {...fadeInUp}
        >
          Get Expert Advice
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Connect with our agricultural specialists for personalized fertilizer recommendations and growing solutions
        </motion.p>
      </div>
    </section>
  );
}