"use client";
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function ReactQueryProvider({ children }) {
     const [queryClient] = useState(() => new QueryClient());
  return (
   <QueryClientProvider client={queryClient}>
    {children}
    <Toaster
    position="top-right"
    richColors
    closeButton
  expand

    />
    </QueryClientProvider>
  )
}
