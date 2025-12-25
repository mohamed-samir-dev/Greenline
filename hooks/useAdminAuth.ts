import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const useAdminAuth = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) {
      router.push("/admin/login");
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/admin/login");
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [router]);

  return { loading };
};
