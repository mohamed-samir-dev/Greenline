'use client';

import { motion } from 'framer-motion';
import { UserGroupIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaWhatsapp, FaSkype } from 'react-icons/fa';
import { fadeInUp } from './animations';

const features = [
  { icon: UserGroupIcon, title: 'Certified Specialists', desc: 'PhD agronomists and certified crop advisors' },
  { icon: ClockIcon, title: 'Quick Response', desc: 'Get answers within 24 hours' },
  { icon: MapPinIcon, title: 'Local Knowledge', desc: 'Region-specific growing advice' }
];

export default function ExpertInfo() {
  return (
    <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Experts?</h2>
      <div className="space-y-6 mb-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <IconComponent className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-xl border border-green-200">
        <h3 className="font-bold text-gray-900 mb-4">Alternative Ways to Connect</h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors">
            <FaWhatsapp className="h-5 w-5" />
            <span>WhatsApp: +1 (555) 123-4567</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors">
            <FaSkype className="h-5 w-5" />
            <span>Skype: greenline.experts</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}