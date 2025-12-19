"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { Mail, User } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';
import ErrorAlert from '@/components/auth/ErrorAlert';
import PasswordStrength from '@/components/auth/PasswordStrength';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  adminPassword: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  const { login } = useUser();
  
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting }, setError } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };
  
  const handlePasswordChange = () => {
    const currentPassword = getValues('password') || '';
    setPasswordStrength(checkPasswordStrength(currentPassword));
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const result = await registerUser(data.email, data.password, data.adminPassword);
      login(result.user);
      router.push('/');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError('root', { message: errorMessage });
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join thousands of satisfied gardeners">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <AuthInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          error={errors.email?.message}
          register={register('email')}
        />

        <div className="space-y-2">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Create a password"
            error={errors.password?.message}
            register={register('password', { onChange: handlePasswordChange })}
          />
          <PasswordStrength strength={passwordStrength} />
        </div>

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          register={register('confirmPassword')}
        />

        <div className="border-t border-gray-200 pt-4">
          <PasswordInput
            id="adminPassword"
            label="Admin Password (Optional)"
            placeholder="Enter admin password to register as admin"
            error={errors.adminPassword?.message}
            register={register('adminPassword')}
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave blank for regular user registration. Enter admin password to register with admin privileges.
          </p>
        </div>

        {errors.root && <ErrorAlert message={errors.root.message || ''} />}

        <AuthButton
          isSubmitting={isSubmitting}
          icon={User}
          text="Create Account"
          loadingText="Creating Account..."
        />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>

      <p className="text-xs text-gray-500 text-center">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-green-600 hover:text-green-500">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-green-600 hover:text-green-500">
          Privacy Policy
        </Link>
      </p>
    </AuthLayout>
  );
}