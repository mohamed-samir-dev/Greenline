"use client";

import { useLogin } from "@/hooks/useLogin";
import LoginFormFields from "./LoginFormFields";
import ErrorMessage from "./ErrorMessage";
import LoginButton from "./LoginButton";

export default function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    showPassword,
    setShowPassword,
    handleLogin,
  } = useLogin();

  return (
    <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-100">
      <form onSubmit={handleLogin} className="space-y-6">
        <LoginFormFields
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <ErrorMessage error={error} />
        <LoginButton loading={loading} />
      </form>
    </div>
  );
}
