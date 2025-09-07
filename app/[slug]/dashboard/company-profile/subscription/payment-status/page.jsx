"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/stores/useAuthStore";

export default function SubscriptionStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get("status");
  const queryClient = useQueryClient();
   const user=useAuthStore((state)=> (state.user))
   const slug=user?.company?.slug

  useEffect(() => {
    // If opened in popup, notify parent and close
    if (window.opener) {
      if (status === "success") {
        window.opener.postMessage({ type: "SUBSCRIPTION_SUCCESS" }, "*");
      } else if (status === "cancel") {
        window.opener.postMessage({ type: "SUBSCRIPTION_CANCELLED" }, "*");
      }
      window.close();
    }

    // Auto redirect after 3 seconds
    if (status === "success" || status === "cancel") {
      const timer = setTimeout(() => {
        router.replace(`/${slug}/dashboard`);
        queryClient.invalidateQueries(["company_profile", slug]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, router]);

  if (status === "success") {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-green-50">
        <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-green-700">Payment Successful</h1>
        <p className="text-gray-600 mt-2">
          Your subscription has been activated successfully.
        </p>
        <p className="text-gray-500 mt-1 text-sm">Redirecting you to dashboard...</p>
      </div>
    );
  }

  if (status === "cancel") {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-red-50">
        <XCircle className="text-red-600 w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-red-700">Payment Cancelled</h1>
        <p className="text-gray-600 mt-2">
          Your subscription was not completed. You can try again later.
        </p>
        <p className="text-gray-500 mt-1 text-sm">Redirecting you to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <p className="text-gray-600">No payment status detected.</p>
    </div>
  );
}
