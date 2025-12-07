"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firebaseClient";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await loadOrders();
      } else {
        router.push("/admin/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const loadOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOrders(ordersData);
  };

  if (loading) return <div className="flex"><AdminSidebar /><div className="ml-64 p-8">Loading...</div></div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="ml-64 flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders Management</h1>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No orders yet</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-mono">{order.id}</td>
                    <td className="px-6 py-4 text-gray-900">{order.customerName || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-900">${order.total?.toFixed(2) || "0.00"}</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{order.status || "Pending"}</span></td>
                    <td className="px-6 py-4 text-gray-900">{order.createdAt || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
