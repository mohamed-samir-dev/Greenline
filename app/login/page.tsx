"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, LogIn } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthButton from '@/components/auth/AuthButton';
import ErrorAlert from '@/components/auth/ErrorAlert';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginUser(data.email, data.password);
      router.push('/');
    } catch (error: unknown) {
      const err = error as { code?: string; message?: string };
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('root', { message: 'Invalid email or password' });
      } else if (err.code === 'auth/invalid-credential') {
        setError('root', { message: 'Invalid credentials' });
      } else {
        setError('root', { message: err.message || 'An error occurred' });
      }
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Access your professional account">
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

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          error={errors.password?.message}
          register={register('password')}
        />

        {errors.root && <ErrorAlert message={errors.root.message || ''} />}

        <AuthButton
          isSubmitting={isSubmitting}
          icon={LogIn}
          text="Sign In"
          loadingText="Signing In..."
        />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don&rsquo;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}