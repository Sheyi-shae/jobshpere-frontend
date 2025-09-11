"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Search,
  Download,
  CheckCircle,
  XCircle,
  Users,
  Star,
  FolderOpen,
  
} from "lucide-react"
import useAuthStore from "@/stores/useAuthStore"
import axios from "axios"
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query"

import { toast } from "sonner"
import JobApplicationFilter from "../_applications/application-filter"
import AllApplicationsCard from "../_applications/all-app-card"
import { JobApplicationSkeleton } from "../_skeleton/job-card-skeleton"

const statusConfig = {


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

export default function ShortlistedApplications() {
     
  const [searchTerm, setSearchTerm] = useState("")
 
  const [sortBy, setSortBy] = useState("newest")
  const [selectedApplication, setSelectedApplication] = useState(null)//for single application
const [isUpdating, setIsUpdating] = useState(false)
      const user=useAuthStore((state) => state.user)
       const queryClient= useQueryClient();
  
  const mutation =useMutation()

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

//filter shortlisted applications
const shortlistedApplications = data?.filter((app) => app.status === "shortlisted");

const filteredApplications = shortlistedApplications
    ?.filter((app) => {
      
      const matchesSearch =
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job.tags.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
      
      return matchesSearch
    })

    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "match":
          return b.matchScore - a.matchScore
       
        default:
          return 0
      }
    })


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

  return (
    <div>
         <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 `}>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shortlisted Applicants</h1>
          <p className="text-muted-foreground">
            Manage {filteredApplications?.length} shortlisted applications{filteredApplications?.length !== 1 ? "s" : ""} across all
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

      <div className="pb-4 pt-6 ">  
                <JobApplicationFilter
      
                status={'shortlisted'}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                 // statusFilter={statusFilter}
                  //setStatusFilter={setStatusFilter}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  
                  filteredApplications={filteredApplications}
                  statusConfig={statusConfig}
              
                />
                </div>

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
              <h3 className="text-lg font-semibold mb-2">You have no shortlisted applications</h3>
             
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
                //handleAnalyzeResume={handleAnalyzeResume}
               updateApplicationStatus={updateApplicationStatus }
                selectedApplication={selectedApplication}
                mutation={mutation}
                //handleDownload={handleDownload}
                //updateApplicationStatus={updateApplicationStatus}
                setSelectedApplication={setSelectedApplication}
               
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
    
    </div>
  )
}
