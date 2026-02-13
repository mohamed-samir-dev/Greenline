"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import { SearchProvider, UserProvider } from "@/contexts";

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  ssr: false,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <UserProvider>
      <SearchProvider>
        <Navbar />
        {children}
        {!isAdminPage && <Footer />}
      </SearchProvider>
    </UserProvider>
  );
}
