'use client';

import { motion } from 'framer-motion';
import { SparklesIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { GiPlantSeed } from 'react-icons/gi';
import { fadeInUp, staggerContainer } from './animations';

export default function MissionCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <div className="bg-linear-to-br from-green-500 to-emerald-600 p-8 rounded-3xl text-white">
              <SparklesIcon className="h-12 w-12 mb-6" />
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-green-100 mb-6 leading-relaxed">
                Revolutionizing agriculture through cutting-edge fertilizer technology that maximizes crop potential while preserving environmental integrity.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <GiPlantSeed className="h-6 w-6" />
                </div>
                <span className="font-semibold">Sustainable Growth Solutions</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-xl">
              <ShieldCheckIcon className="h-12 w-12 text-green-600 mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To be the global leader in sustainable plant nutrition, empowering every grower to achieve exceptional results while protecting our planet.
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <GlobeAltIcon className="h-6 w-6 text-green-600" />
                </div>
                <span className="font-semibold text-gray-900">Global Impact</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}