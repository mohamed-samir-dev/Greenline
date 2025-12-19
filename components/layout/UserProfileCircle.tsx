"use client";

interface User {
  id: string;
  email: string;
  numericId: number;
  isActive: boolean;
}

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

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-green-600 flex items-center justify-center text-white font-semibold ${className}`}>
      <span>{getInitials(user.email)}</span>
    </div>
  );
}