'use client';

import { motion } from 'framer-motion';
import { BeakerIcon, UserGroupIcon, TrophyIcon, HeartIcon } from '@heroicons/react/24/outline';
import { FaLeaf, FaRecycle } from 'react-icons/fa';
import { fadeInUp, staggerContainer } from './animations';

const values = [
  { icon: FaLeaf, title: 'Sustainability', desc: 'Eco-friendly solutions that protect our planet for future generations', color: 'from-green-500 to-emerald-500' },
  { icon: TrophyIcon, title: 'Excellence', desc: 'Uncompromising quality standards in every product we develop', color: 'from-yellow-500 to-orange-500' },
  { icon: HeartIcon, title: 'Care', desc: 'Genuine commitment to our customers success and satisfaction', color: 'from-pink-500 to-red-500' },
  { icon: BeakerIcon, title: 'Innovation', desc: 'Cutting-edge research driving the future of plant nutrition', color: 'from-blue-500 to-indigo-500' },
  { icon: UserGroupIcon, title: 'Community', desc: 'Building lasting relationships with growers worldwide', color: 'from-purple-500 to-pink-500' },
  { icon: FaRecycle, title: 'Responsibility', desc: 'Committed to sustainable practices and environmental stewardship', color: 'from-teal-500 to-cyan-500' }
];

export default function ValuesGrid() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-linear-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          {...fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Core Values</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            The principles that drive our innovation and guide our commitment to excellence
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-r ${value.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{value.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}