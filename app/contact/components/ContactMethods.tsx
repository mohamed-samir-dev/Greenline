'use client';

import { motion } from 'framer-motion';
import { PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { fadeInUp } from './animations';

const contactMethods = [
  { icon: PhoneIcon, title: 'Call Us', info: '+1 (555) 123-4567', desc: 'Mon-Fri 8AM-6PM EST', action: 'tel:+15551234567' },
  { icon: EnvelopeIcon, title: 'Email Support', info: 'experts@greenline.com', desc: '24/7 Response', action: 'mailto:experts@greenline.com' },
  { icon: ChatBubbleLeftRightIcon, title: 'Live Chat', info: 'Instant Help', desc: 'Available Now', action: '#' }
];

export default function ContactMethods() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <motion.a
                key={index}
                href={contact.action}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:border-green-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <IconComponent className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-green-600 font-semibold mb-1">{contact.info}</p>
                <p className="text-gray-500 text-sm">{contact.desc}</p>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}