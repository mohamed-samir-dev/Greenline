'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from './animations';

const timelineData = [
  { year: '2003', title: 'Foundation', desc: 'Started as family business with organic fertilizers' },
  { year: '2008', title: 'Expansion', desc: 'Launched liquid concentrate product line' },
  { year: '2015', title: 'Innovation', desc: 'Introduced smart-release granular formulas' },
  { year: '2020', title: 'Sustainability', desc: 'Achieved carbon-neutral manufacturing' },
  { year: '2024', title: 'Global Reach', desc: 'Serving 50+ countries worldwide' }
];

export default function Timeline() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12 sm:mb-16" {...fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Our Journey</h2>
          <p className="text-lg sm:text-xl text-gray-600">Two decades of growth and innovation</p>
        </motion.div>
        
        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-green-200"></div>
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-8`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                <div className="bg-white p-6 rounded-xl shadow-lg border border-green-100">
                  <div className="text-2xl font-bold text-green-600 mb-2">{item.year}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          <div className="absolute left-6 top-0 h-full w-0.5 bg-green-200"></div>
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative flex items-start mb-8 last:mb-0"
            >
              <div className="absolute left-6 transform -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow mt-2"></div>
              <div className="ml-12 flex-1">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-green-100">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 mb-2">{item.year}</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}