import { AlertCircle, LucideIcon } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface AuthInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: LucideIcon;
  error?: string;
  register: UseFormRegisterReturn;
  rightElement?: React.ReactNode;
}

export default function AuthInput({ id, label, type, placeholder, icon: Icon, error, register, rightElement }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          type={type}
          {...register}
          className={`text-black block w-full pl-10 ${rightElement ? 'pr-10' : 'pr-3'} py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
          }`}
          placeholder={placeholder}
        />
        {rightElement}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
