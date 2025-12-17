'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { fadeInUp } from './animations';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cropType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <motion.div {...fadeInUp}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6 text-black">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-black">
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <select
            value={formData.cropType}
            onChange={(e) => setFormData({...formData, cropType: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select Crop Type</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="flowers">Flowers</option>
            <option value="lawn">Lawn & Turf</option>
            <option value="trees">Trees & Shrubs</option>
          </select>
        </div>
        <textarea
          placeholder="Describe your growing challenge or question..."
          value={formData.message} 
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={5}
          className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          required
        />
        <motion.button  
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-linear-to-r from-green-500 to-emerald-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all"
        >
          Get Expert Advice
        </motion.button>
      </form>
    </motion.div>
  );
}