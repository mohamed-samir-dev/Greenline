'use client';

import { motion } from 'framer-motion';
import { ShieldCheckIcon, GlobeAltIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { FaLeaf } from 'react-icons/fa';
import { fadeInUp, staggerContainer } from './animations';

const certifications = [
  { title: 'ISO 9001', desc: 'Quality Management', icon: ShieldCheckIcon },
  { title: 'OMRI Listed', desc: 'Organic Materials', icon: FaLeaf },
  { title: 'EPA Registered', desc: 'Environmental Safety', icon: GlobeAltIcon },
  { title: 'Innovation Award', desc: 'AgTech Excellence 2023', icon: TrophyIcon }
];

export default function Certifications() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Awards</h2>
          <p className="text-xl text-gray-600">Recognized excellence in quality and sustainability</p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6 border border-green-200 rounded-xl hover:border-green-400 transition-colors"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-gray-600 text-sm">{cert.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}