"use client";

import { useState } from 'react';
import { initializeAdminPassword } from '@/lib/firebase/initAdminPassword';

export default function SetupAdmin() {
  const [status, setStatus] = useState('');
  const [password, setPassword] = useState('admin123');

  const handleSetup = async () => {
    try {
      setStatus('Initializing admin password...');
      const success = await initializeAdminPassword(password);
      if (success) {
        setStatus('Admin password initialized successfully!');
      } else {
        setStatus('Failed to initialize admin password');
      }
    } catch (error) {
      setStatus('Error: ' + (error as Error).message);
    }
  };

  return (
    <div className="p-8 text-black max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Setup Admin Password</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Initial Admin Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter initial admin password"
          />
        </div>
        
        <button 
          onClick={handleSetup} 
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Initialize Admin Password
        </button>
        
        {status && (
          <div className={`p-3 rounded-md text-sm ${
            status.includes('successfully') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {status}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-900 mb-2">Next Steps:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>1. Run this setup once to initialize the admin password</li>
            <li>2. Users can now register as admins using this password</li>
            <li>3. Change the password later in Admin Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}