'use client';

import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { fadeInUp } from './animations';

export default function OfficeInfo() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" {...fadeInUp}>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Headquarters</h2>
          <p className="text-gray-600">Stop by for in-person consultations and product demonstrations</p>
        </motion.div>
        <motion.div 
          className="bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center"
          {...fadeInUp}
        >
          <MapPinIcon className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Green Line Agricultural Solutions</h3>
          <p className="text-green-100 mb-4">1234 Agriculture Drive, Farmington Valley, CA 90210</p>
          <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
            <div>
              <p className="font-semibold">Business Hours</p>
              <p className="text-green-100">Mon-Fri: 8AM-6PM</p>
              <p className="text-green-100">Sat: 9AM-4PM</p>
            </div>
            <div>
              <p className="font-semibold">Services Available</p>
              <p className="text-green-100">Soil Testing</p>
              <p className="text-green-100">Custom Blends</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}