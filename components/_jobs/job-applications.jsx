"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  FolderOpen,
  Users,
  Star,
  AlertCircleIcon,
  ShieldAlert,
  
} from "lucide-react"
import useAuthStore from "@/stores/useAuthStore"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"
import JobApplicationFilter from "../_applications/application-filter"
import AllApplicationsCard from "../_applications/all-app-card"
import { JobApplicationSkeleton } from "../_skeleton/job-card-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { set } from "zod"


const statusConfig = {
  applied: {
    label: "Applied",
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    icon: AlertCircle,
  },

  shortlisted: {
    label: "Shortlisted",
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    icon: Star,
  },
 
  hired: {
    label: "Hired",
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    icon: CheckCircle,
  },
  screened_out: {
    label: "Screened-out",
    color: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    icon: XCircle,
  },
}



 

export function JobApplicationsDisplay() {
  const user=useAuthStore((state) => state.user)
  const queryClient= useQueryClient();
  const subscriptionStatus = user?.company?.subscriptionStatus;
const companySlug = user?.company?.slug 
//fetch applications by company slug from backend
 const {
  data,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ['applications', companySlug],
  queryFn: async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/application/${companySlug}`,
      { withCredentials: true }
    );
    
    return res.data.data
  },
  enabled: !!companySlug,
  staleTime: 5 * 60 * 1000,
  retry: (failureCount, err) => {
    if (err?.response?.status === 401) return false;
    return failureCount < 2;
  },
  onError: () => {
    toast.error("Failed to fetch jobs. Please try again later.");
  },
});

    

 

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [positionFilter, setPositionFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedApplication, setSelectedApplication] = useState(null)//for single application
  const [isUpdating, setIsUpdating] = useState(false)



  
  const filteredApplications = data
    ?.filter((app) => {
      
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.tags.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === "all" || app.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "match":
          return b.matchScore - a.matchScore
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

   
 
const handleDownload = (resumeUrl) => {
  const authPart = `?timestamp=${Math.round(Date.now()/1000)}&api_key=${process.env.CLOUDINARY_API_KEY}`;
  
  const downloadUrl = resumeUrl.includes('?')
    ? `${resumeUrl}&fl_attachment${authPart}`
    : `${resumeUrl}?fl_attachment${authPart}`;
    
  window.open(downloadUrl, '_blank');
};

  const getStatusStats = () => {
    const stats = Object.keys(statusConfig)?.map((status) => ({
      status,
      count: data?.filter((app) => app.status === status).length,
      ...statusConfig[status],
    }))
    return stats
  }


  const updateApplicationStatus = async (id,status) => {
    setIsUpdating(true);
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/application/${companySlug}/update-status`, { status,id }, {
        withCredentials: true,
      });
     
        toast.success("Application status updated successfully!");
        queryClient.invalidateQueries(['applications', companySlug]);
     
    } catch (error) {
      toast.error("Failed to update application status. Please try again later.");
    }finally{
      setIsUpdating(false);
    }
    
  //  setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)))
  }


  //use react query mutation to handle resume analysis
  const mutation = useMutation({
    mutationFn: (data) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/application/score`, data, {
      withCredentials: true,
    }),
    onSuccess: (data) => {
     
      toast.success("Resume analysis completed successfully!");
      //call queryfn of applications
      queryClient.invalidateQueries(['applications', companySlug]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to analyze resume. Please try again later.");

    },
  });

  
    const handleAnalyzeResume = (jobId, resumeUrl, email) => {
  mutation.mutate({ jobId, resumeUrl, email });
};

//console.log('filteredApplications:', filteredApplications);

  return (
    <>
     {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 `}>
         <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground">
            Manage {filteredApplications?.length} application{filteredApplications?.length !== 1 ? "s" : ""} across all
            positions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            <Users className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getStatusStats()?.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.status}
              className={`${stat.bgColor} ${stat.borderColor} border-2 hover:shadow-md transition-shadow cursor-pointer`}
            >
              <CardContent className="pt-4 ">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${stat.textColor}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.count ||0}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="pb-4 pt-6 ">  
          <JobApplicationFilter

          status={'applied'}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            
            filteredApplications={filteredApplications}
            statusConfig={statusConfig}
        
          />
          </div>

          {/* alert warning if no subscription */}
          {subscriptionStatus === 'inactive' && (
            <Alert variant="destructive" className="mb-4">
              <ShieldAlert/>
              <AlertTitle>No Subscription</AlertTitle>
              <AlertDescription>
                You need an active subscription to use our superpower (AI analysis).
                <Link href={`/${companySlug}/dashboard/company-profile/subscription`} className="p-2 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded">
                  Subcribe Now
                </Link>
              </AlertDescription>
            </Alert>
          )}

{
  isLoading ? (
    <>
     <JobApplicationSkeleton/>
     <JobApplicationSkeleton/>
    </>
  ) : (
    <>
      {/* Case 1: Search with no results (priority) */}
      {searchTerm && filteredApplications?.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No matching applications found</h3>
              <p className="text-muted-foreground mb-4">
                No results for "{searchTerm}". Try adjusting your search or filters.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setPositionFilter("all")
                }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
              >
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Case 2: No applications at all in the system */}
      {!searchTerm && filteredApplications?.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No  applications found</h3>
             
             
            </div>
          </CardContent>
        </Card>
      )}

      {/* Case 3: Show applications grid */}
      {filteredApplications?.length > 0 && (
        <div className={`space-y-6 ${isUpdating && "blur opacity-60"}`}>
          <div className="grid gap-6">
            {filteredApplications.map((application) => (
              <AllApplicationsCard
                key={application.id}
                application={application}
                statusInfo={statusConfig[application.status]}
                StatusIcon={statusConfig[application.status].icon}
                handleAnalyzeResume={handleAnalyzeResume}
                
                selectedApplication={selectedApplication}
                mutation={mutation}
                handleDownload={handleDownload}
                updateApplicationStatus={updateApplicationStatus}
                setSelectedApplication={setSelectedApplication}
             
                subscriptionStatus={subscriptionStatus}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
      
</>
 
  )
}
