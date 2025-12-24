'use client';

import { motion } from 'framer-motion';
import { UserGroupIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp } from 'react-icons/fa';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { fadeInUp } from './animations';

const features = [
  { icon: UserGroupIcon, title: 'Certified Specialists', desc: 'PhD agronomists and certified crop advisors' },
  { icon: ClockIcon, title: 'Quick Response', desc: 'Get answers within 24 hours' },
  { icon: MapPinIcon, title: 'Local Knowledge', desc: 'Region-specific growing advice' }
];

export default function ExpertInfo() {
  return (
    <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose Our Experts?</h2>
      <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl border border-green-200">
        <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Alternative Ways to Connect</h3>
        <div className="space-y-2 sm:space-y-3">
          <a href="https://wa.me/01012486445" target='_blank' className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-green-600 transition-colors text-sm sm:text-base">
            <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="break-all">WhatsApp: 01012486445</span>
          </a>
          <a href="mailto:mohammedsamiermouawad@gmail.com" target='_blank' className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-green-600 transition-colors text-sm sm:text-base">
            <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="break-all">Email: mohammedsamiermouawad@gmail.com</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}