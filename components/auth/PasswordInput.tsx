import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';
import AuthInput from './AuthInput';

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export default function PasswordInput({ id, label, placeholder, error, register }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthInput
      id={id}
      label={label}
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      icon={Lock}
      error={error}
      register={register}
      rightElement={
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      }
    />
  );
}
