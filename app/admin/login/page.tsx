"use client";

import LoginHeader from "@/components/admin/login/LoginHeader";
import LoginForm from "@/components/admin/login/LoginForm";
import LoginBackground from "@/components/admin/login/LoginBackground";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <LoginBackground />
      <div className="relative w-full max-w-md px-6">
        <LoginHeader />
        <LoginForm />
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Protected by enterprise-grade security</p>
        </div>
      </div>
    </div>
  );
}
