'use client';

import { motion } from 'framer-motion';
import { FaSeedling } from 'react-icons/fa';
import { fadeInUp } from './animations';

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-green-100 px-3 py-2 sm:px-4 rounded-full mb-4 sm:mb-6"
          >
            <FaSeedling className="text-green-600 text-sm sm:text-base" />
            <span className="text-green-700 font-medium text-sm sm:text-base">Growing Excellence Since 2003</span>
          </motion.div>
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6 sm:mb-8 px-2"
            {...fadeInUp}
          >
            About Green Line
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Pioneering sustainable agriculture through innovative fertilizer solutions. 
            We transform gardens into thriving ecosystems and help farmers achieve extraordinary yields.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}