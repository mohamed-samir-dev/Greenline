'use client';

import { motion } from 'framer-motion';
import { BeakerIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { FaLeaf } from 'react-icons/fa';
import { fadeInUp, staggerContainer } from './animations';

const teamMembers = [
  { name: 'Dr. Amira Hassan', role: 'Chief Scientific Officer', exp: '15+ years in plant nutrition research', icon: BeakerIcon },
  { name: 'Omar Al-Rashid', role: 'VP of Operations', exp: 'Former agricultural consultant', icon: UserGroupIcon },
  { name: 'Layla Mahmoud', role: 'Sustainability Director', exp: 'Environmental science PhD', icon: FaLeaf }
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-16" {...fadeInUp}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-600">Experts driving agricultural innovation</p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-24 h-24 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-green-600 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600">{member.exp}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}