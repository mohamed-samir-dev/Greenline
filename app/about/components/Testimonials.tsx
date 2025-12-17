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
    <section className="py-20 bg-linear-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600">Real results from real growers</p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="text-green-500 text-4xl mb-4">&ldquo;</div>
              <p className="text-gray-600 mb-6 italic">{testimonial.quote}</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-green-600 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}