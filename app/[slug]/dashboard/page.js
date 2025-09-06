"use client"
import { AdvancedDashboardOverview } from '@/components/_dashboard/dashboard-overview';
import DashboardTitle from '@/components/_dashboard/dashboard-title';
import useAuthStore from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React from 'react'


export default function HomeComponent() {
  const user = useAuthStore((state) => state.user);
  const params = useParams();
  const { slug } = params;

  //fetch company details by slug

  const {
      data,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['company'],
      queryFn: async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${slug}`,
          { withCredentials: true }
        );
        return res.data.data;
      },
     
    });

  
   
   

  return (
    <div>
      <DashboardTitle
       title={user?.company.name}
       subTitle={`Welcome back! Here's what's happening with your recruitment.`}/>
       <AdvancedDashboardOverview data={data} loading={isLoading} />
        </div>

  )
}
