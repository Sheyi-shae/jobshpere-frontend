"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { PageLoader } from "@/components/loader";

export default function AuthCheck({ children, fallback = "/join" }) {
  const { setUser, user: loggedinUser, setLoading } = useAuthStore();
  const router = useRouter();
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`,
        { withCredentials: true }
      ); 
      return res.data;
     
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
    onSuccess: (data) => {
      setUser(data.user);
    },
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (isLoading) return;

    if (isError || !data?.user) {
      router.replace(fallback);
      return;
    }

    if (!loggedinUser) {
      router.replace(fallback);
      return;
    }

    const companySlug = data.user.company?.slug;

    if (slug && slug !== companySlug) {
      router.replace(companySlug ? `/${companySlug}/dashboard` : fallback);
    }
  }, [isLoading, isError, data, slug, loggedinUser, router, fallback]);

  if (isLoading) {
    return <PageLoader text="Loading..." />;
  }

  if (isError || !data?.user) {
    return <PageLoader text="Redirecting..." />;
  }

  return <>{children}</>;
}
