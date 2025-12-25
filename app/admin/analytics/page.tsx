"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminAnalytics() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/admin/login");
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/admin/login");
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="flex"><AdminSidebar /><div className="ml-64 p-8">Loading...</div></div>;

  const metrics = [
    { label: "Conversion Rate", value: "3.2%", change: "+0.5%", trend: "up" },
    { label: "Avg Order Value", value: "$127.50", change: "+$12", trend: "up" },
    { label: "Bounce Rate", value: "42.3%", change: "-2.1%", trend: "down" },
    { label: "Page Views", value: "12,543", change: "+1,234", trend: "up" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics & Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sales Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart visualization coming soon
          </div>
        </div>
      </div>
    </div>
  );
}
