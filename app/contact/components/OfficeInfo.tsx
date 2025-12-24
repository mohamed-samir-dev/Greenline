'use client';

import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { fadeInUp } from './animations';

export default function OfficeInfo() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-8 sm:mb-12" {...fadeInUp}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Visit Our Headquarters</h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">Stop by for in-person consultations and product demonstrations</p>
        </motion.div>
        <motion.div 
          className="bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl p-6 sm:p-8 text-white text-center"
          {...fadeInUp}
        >
          <MapPinIcon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Green Line Agricultural Solutions</h3>
          <p className="text-green-100 mb-4 sm:mb-6 text-sm sm:text-base px-2">1234 Agriculture Drive, Farmington Valley, CA 90210</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Business Hours</p>
              <p className="text-green-100 text-xs sm:text-sm">Mon-Fri: 8AM-6PM</p>
              <p className="text-green-100 text-xs sm:text-sm">Sat: 9AM-4PM</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">Services Available</p>
              <p className="text-green-100 text-xs sm:text-sm">Soil Testing</p>
              <p className="text-green-100 text-xs sm:text-sm">Custom Blends</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}