"use client"


import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  UserCog,
  Filter,
  Download,
  RefreshCw,
  BadgeCheck,
  UserCheck,
  BadgeX,
  Eye,
 
} from "lucide-react"
import { MetricCard } from "./dashboard-metric-card"
import { MetricCardSkeleton } from "../_frontpage/_skeleton/metric-skeleton"

import ApplicationTrend from "../_frontpage/_charts/application-trend"

import HiringFunnel from "./hiring-funnel"

import JobByType from "./job-by-type"
import Top3 from "./top3"

import RecentActivity from "./recent-activity"


export function AdvancedDashboardOverview({data, loading}) {

  const [selectedTimeframe, setSelectedTimeframe] = useState("6M")



  const { jobPosts, users,activity, applications } = data ||[];

  //filters
  const activeJobPosts = jobPosts?.filter((post) => post.isActive );
  const shortlistedApplications = applications?.filter((app) => app.status === 'shortlisted');

  //calculations
  const totalApplications = applications?.length;
  const totalShortlisted = shortlistedApplications?.length;
  const shortlistRate = 
  totalApplications > 0 ? (totalShortlisted / totalApplications * 100).toFixed(2) : 0;




  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* header */}
         <div className="flex flex-col  lg:flex-row lg:items-center lg:justify-between gap-4">
          <div></div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
              {["1M", "3M", "6M", "1Y"].map((period) => (
                <Button
                  key={period}
                  variant={selectedTimeframe === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTimeframe(period)}
                  className={
                    selectedTimeframe === period
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                      : "text-gray-600 hover:text-blue-600"
                  }
                >
                  {period}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="bg-white">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-white">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
       

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {loading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <MetricCardSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              <MetricCard
                title="Total Applications"
                value={applications?.length}
                change={18.2}
                icon={Users}
            color="from-blue-500 to-indigo-500"
            subtitle="overall"
          />
          <MetricCard
            title="Active Jobs"
            value={activeJobPosts?.length}
            change={12.5}
            icon={Briefcase}
            color="from-green-500 to-emerald-500"
            subtitle="Currently open"
          />
          <MetricCard
            title="Managers"
            value={users?.length}
           // change={-2.1}
            icon={UserCog}
            color="from-purple-500 to-pink-500"
            subtitle={`Portal Manager${users?.length > 1 ? 's' : ''}`}
          />
          <MetricCard
            title="Shortlist Rate"
            value={shortlistRate + "%"}
            change={8.7}
            icon={UserCheck}
            color="from-orange-500 to-amber-500"
            subtitle="Applications to shortlist"
          />
          <MetricCard
            title="Subscription Status"
            value={data?.subscriptionStatus}
            //change={''}
            icon={data?.subscriptionStatus === 'active' ? BadgeCheck : BadgeX}
            color={data?.subscriptionStatus === 'active'
               ? 'from-green-600 to-emerald-600' : 'from-red-600 to-pink-600'}
            subtitle={data?.subscriptionStatus === 'active' ? 
              'Active Subscription' : 'Inactive Subscription'}
          />
          </>
          )}
        </div>

        {/* Charts Row */}
        <ApplicationTrend applications={applications} />

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hiring Funnel */}
        <HiringFunnel applications={applications} />

          {/* Applications by type */}
          <JobByType applications={applications}/>

          {/* Top Performers */}
          <Top3 activeJobPosts={activeJobPosts}/>
         
        </div>

        {/* Recent Activity */}
        <RecentActivity activity={activity}/>
       
      </div>
    </div>
  )
}
