'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from './animations';

export default function CTASection() {
  return (
    <section className="py-20 bg-linear-to-br from-gray-900 to-green-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Growing Experience?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join the Green Line family and discover why thousands of growers trust us for their success.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-linear-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300"
            >
              Explore Products
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white px-10 py-4 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Get Expert Advice
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}