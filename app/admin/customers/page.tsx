"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminCustomers() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin/login");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="flex"><AdminSidebar /><div className="ml-64 p-8">Loading...</div></div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Management</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-500">
          Customer data will be displayed here
        </div>
      </div>
    </div>
  );
}
