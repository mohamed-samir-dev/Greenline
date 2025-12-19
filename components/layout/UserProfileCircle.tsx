"use client";

import { User } from 'firebase/auth';
import Image from 'next/image';

interface UserProfileCircleProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function UserProfileCircle({ user, size = 'md', className = '' }: UserProfileCircleProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.slice(0, 2).toUpperCase();
  };

  const getDisplayName = () => {
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-green-600 flex items-center justify-center text-white font-semibold ${className}`}>
      {user.photoURL ? (
        <Image
          src={user.photoURL}
          alt={getDisplayName()}
          width={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          height={size === 'sm' ? 32 : size === 'md' ? 40 : 48}
          className="rounded-full object-cover"
        />
      ) : (
        <span>{getInitials(user.email || 'User')}</span>
      )}
    </div>
  );
}