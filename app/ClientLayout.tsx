"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/footer/Footer";
import { SearchProvider } from "@/contexts";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <SearchProvider>
      <Navbar />
      {children}
      {!isAdminPage && <Footer />}
    </SearchProvider>
  );
}
