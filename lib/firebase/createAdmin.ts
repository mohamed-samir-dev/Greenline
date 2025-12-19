// This is a utility script to create the first admin user
// Run this once to set up your admin account

import { registerAdmin } from './auth';

export const createFirstAdmin = async (email: string, password: string) => {
  try {
    const result = await registerAdmin(email, password);
    console.log('Admin created successfully:', result.user.email);
    return result;
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

// To create your first admin, call this function:
// createFirstAdmin('your-admin@email.com', 'your-secure-password');