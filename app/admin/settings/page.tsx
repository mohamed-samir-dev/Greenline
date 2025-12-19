"use client";

import { useState } from 'react';
import { updateAdminPassword } from '@/lib/firebase/addAdminRecord';
import { Key, Save } from 'lucide-react';

export default function AdminSettings() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    try {
      await updateAdminPassword(newPassword);
      setMessage('Admin password updated successfully');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage('Error updating password: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <Key className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        </div>
        
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Admin Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className=" text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter new admin password"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Confirm new admin password"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            message.includes('successfully') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-900 mb-2">How it works:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• This password is used during user registration</li>
            <li>• Users can enter this password to register as admins</li>
            <li>• Change this password regularly for security</li>
          </ul>
        </div>
      </div>
    </div>
  );
}