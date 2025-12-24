'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from './animations';

const testimonials = [
  { quote: 'Green Line transformed my garden. 40% better yields with their organic line.', author: 'Fatima Al-Zahra', role: 'Home Gardener' },
  { quote: 'Professional grade products that deliver consistent results season after season.', author: 'Ahmed Khalil', role: 'Commercial Farmer' },
  { quote: 'Their sustainability focus aligns perfectly with our environmental goals.', author: 'Yusuf Mansour', role: 'Organic Farm Owner' }
];

export default function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-linear-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">What Our Customers Say</h2>
          <p className="text-lg sm:text-xl text-gray-600">Real results from real growers</p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg"
            >
              <div className="text-green-500 text-3xl sm:text-4xl mb-3 sm:mb-4">&ldquo;</div>
              <p className="text-gray-600 mb-4 sm:mb-6 italic text-sm sm:text-base">{testimonial.quote}</p>
              <div className="border-t pt-3 sm:pt-4">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.author}</p>
                <p className="text-green-600 text-xs sm:text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}