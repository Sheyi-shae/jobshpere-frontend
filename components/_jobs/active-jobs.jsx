"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  Search,
  MoreHorizontal,
  Eye,
  Users,
  MapPin,
  Calendar,

  Clock,

  HandCoins,
  User,
  Briefcase,
  TrendingUpDown,
  FolderOpen,
} from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/stores/useAuthStore"
import { toast } from "sonner"

import timeAgo from "@/libs/timeAgo"

import ActiveJobsDialog from "./active-jobs-dialog"
import { formatCurrency } from "@/libs/currencyFormat"
import { JobApplicationSkeleton } from "../_skeleton/job-card-skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"






const statusColors = {
  true: "bg-green-100 text-green-800",
  false: "bg-yellow-100 text-yellow-800",
  expired: "bg-red-100 text-red-800",
}

export function ActiveJobsDisplay() {
  const user = useAuthStore((state) => state.user);
  const companySlug = user?.company?.slug;

 const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${companySlug}/company-jobs`, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
     // console.log("Fetched jobs:", data);
      // Optionally set jobs in state or store
      // setJobs(data.data);
    },
    onError: () => {
      toast.error("Failed to fetch jobs. Please try again later.");
    },
    //staleTime: 5 * 60 * 1000, // Optional: cache user for 5 mins
    retry: false // Don’t retry if unauthorized
  });



  const jobs = data?.data || [];
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedJob, setSelectedJob] = useState(null) 
  const [moveJob, setMoveJob] = useState(false)

    const queryClient = useQueryClient()
    const router =useRouter()
  // Get unique departments and locations for filters
  const type = [...new Set(jobs.map((job) => job.type))]

  //filter active jobs
  const activeJobs = jobs.filter((job) => job.isActive );

  // Filter and sort jobs
  const filteredJobs = activeJobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.type.toLowerCase().includes(searchTerm.toLowerCase())
     const matchesJobType = typeFilter === "all" || job.type === typeFilter
      const matchesLocation =
        job.location.toLowerCase().includes(locationFilter.toLowerCase()) 
      return matchesSearch && matchesJobType && matchesLocation
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "applications":
          return b.applications - a.applications
        case "views":
          return b.views - a.views
        default:
          return 0
      }
    })

   // Handle move job
const handleMoveJob = async(job) => {
  
  const updatedJob = { ...job, isActive: false};
  const slug= companySlug
  try {
    setMoveJob(true);
   const res= await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${slug}/update-job/${job.slug}`, updatedJob, { withCredentials: true });
    toast.success("Job moved to draft successfully!");
    //invalidate query
    queryClient.invalidateQueries(['draft-jobs']);
    router.push(`/${slug}/dashboard/jobs/draft-jobs`);
  } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to move job. Please try again.");
     // console.log("Error:", error);
    } finally {
      setMoveJob(false);
    }
}

///:slug/delete-job/:jobSlug

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl bg-gradient-to-r bg-clip-text text-transparent from-slate-600 via-slate-700 to-blue-800 font-bold tracking-tight">
          Active Jobs</h1>
          <p className="text-muted-foreground">
            Manage your {filteredJobs.length} active job posting{filteredJobs.length !== 1 ? "s" : ""}
          </p>
        </div>
      
      </div>

      {/* Filters and Search */}
      <Card className={'ring-blue-800 ring-1 rounded-sm bg-blue-50'}>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Jobs</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job </Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className={'w-full'}>
                  <SelectValue placeholder="All Job Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job types</SelectItem>
                  {type.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            
               <div className="space-y-2">
              <Label htmlFor="search">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className={'w-full'}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="applications">Most Applications</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

  
      {
        isLoading ? (
          <>
          {[...Array(4)].map((_, index) => (
           <JobApplicationSkeleton key={index}/>
          ))}
          </>
        ) : (
          <>
            {/* Case 1: Search with no results (priority) */}
            {searchTerm && filteredJobs?.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-blue-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No matching jobs found</h3>
                    <p className="text-muted-foreground mb-4">
                      No results for "{searchTerm}". Try adjusting your search or filters.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setTypeFilter("all")
                        setLocationFilter("")
                       
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
            {!searchTerm && filteredJobs?.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FolderOpen className="h-8 w-8 text-blue-600 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">You have no active job postings</h3>
                   
                     <p className="text-muted-foreground mb-4">
                      Start by creating a new job posting.
                    </p>
                   <Link href={`/${user?.company?.slug}/dashboard/jobs`}>
                     <Button
                       variant="outline"
                       className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
                     >
                       Create Job
                     </Button>
                   </Link>
                  </div>
                </CardContent>
              </Card>
            )}
      
            {/* Case 3: Show applications grid */}
            {filteredJobs?.length > 0 && (

      <div className={`grid gap-6 ${moveJob ? "opacity-50 pointer-events-none" : ""}`}>
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md  ring-1 ring-blue-200 transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        {/* <Badge className={urgencyColors[job.urgency]}>
                          {job.urgency} priority
                        </Badge> */}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        
                        <span className="flex items-center gap-1 truncate">
                          <User className="h-4 w-4" />
                          {job.user.role}
                        </span>
                        <span className="flex items-center gap-1 truncate">
                          <Briefcase className="h-4 w-4" />
                          {job.type}</span>
                        <span className="flex items-center gap-1">
                          <HandCoins className="h-4 w-4" />
                          {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                        </span>
                      </div>
                    </div>
                    <Badge className={statusColors[job.isActive]}>
                    {job.isActive ? "Active" : "Inactive"}</Badge>
                  </div>

                  <p className="text-muted-foreground line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.slice(0, 4).map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs
                       bg-gradient-to-r from-slate-600 to-blue-800 text-white">
                        {req}
                      </Badge>
                    ))}
                    {job.tags.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.tags.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{job?.applications.length}</span>
                      <span className="text-muted-foreground">applications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{job?.jobViews.length}</span>
                      <span className="text-muted-foreground">views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Posted {timeAgo(job.createdAt)}</span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{deadlineDate(job.createdAt)} days left</span>
                    </div> */}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col flex-row items-center gap-2">
                  
                <ActiveJobsDialog
                job={job}
                selectedJob={selectedJob}
                setSelectedJob={setSelectedJob}
                slug={companySlug}
                handleMoveJob={handleMoveJob}
                />

                
                
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
                
            )}
          </>
        )
      }
    </div>
  )
}
