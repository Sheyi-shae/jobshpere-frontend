"use client"

import { useState, useEffect, useMemo } from "react"
import HeroSection from "./hero-section"
import { JobFilters } from "./job-filter"
import { JobCard } from "./job-card"
import { JobDetailsPanel } from "./desktop-jobdetails"
import { JobApplicationModal } from "./application-modal"
import { FeaturedCompanies } from "./featured-companies"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MobileJobCard } from "./mobile-jobcard"

import { JobApplicationSkeleton } from "../_skeleton/job-card-skeleton"
import { JobDetailsSkeleton } from "./_skeleton/job-details-skeleton"
import { Card, CardContent } from "../ui/card"
import { FolderOpen, RefreshCw, Search } from "lucide-react"
import { Button } from "../ui/button"
import EmptyState from "../_job-categories/job-not-found"

  
  
   
export default function Homepage() {
  const {
      data,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['jobs'],
      queryFn: async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/public-jobs`, );
        return res.data.data;
      },
      onSuccess: (data) => {
        //console.log("Fetched jobs:", data);
        
      },
      onError: () => {
        toast.error("Failed to fetch jobs. Please try again later.");
      },
      staleTime: 5 * 60 * 1000, // Optional: cache user for 5 mins
      retry: false // Don’t retry if unauthorized
    });
    
 // const [filteredJobs, setFilteredJobs] = useState(data)
  const [selectedJob, setSelectedJob] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("all")
  const [salaryRange, setSalaryRange] = useState("all")
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [applicationJob, setApplicationJob] = useState(null)


  //filter isActive jobs from data
  const activeJobs = data?.filter((job) => job.isActive)
   // Filter jobs based on search criteria
 const filteredJobs = useMemo(() => {
  let filtered = activeJobs

  if (searchTerm) {
    filtered = filtered.filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  if (location) {
    filtered = filtered.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (jobType !== "all") {
    filtered = filtered.filter((job) => job.type === jobType)
  }

  if (salaryRange !== "all") {
    filtered = filtered.filter((job) => {
      const salary = Number(job.salaryMax)
      if (isNaN(salary)) return false
      switch (salaryRange) {
        case "0-50000":
          return salary >= 0 && salary <= 50000
        case "50000-100000":
          return salary > 50000 && salary <= 100000
        case "100000-150000":
          return salary > 100000 && salary <= 150000
        case "150000+":
          return salary > 150000
        default:
          return true
      }
    })
  }

  return filtered
}, [activeJobs, searchTerm, location, jobType, salaryRange])

    const handleHeroSearch = (term, loc) => {
    setSearchTerm(term)
    setLocation(loc)
    // Scroll to jobs section
    document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleJobSelect = (job) => {
    setSelectedJob(job)
  }

  const handleApply = (job) => {
    setApplicationJob(job)
    setIsApplicationModalOpen(true)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setLocation("")
    setJobType("all")
    setSalaryRange("all")
  }
    const handleCompanySearch = (companyName) => {
    setSearchTerm(companyName)
    // Scroll to jobs section
    document.getElementById("jobs-section")?.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection onSearch={handleHeroSearch} />

      {/* Jobs Section */}
      <div id="jobs-section" className="container mx-auto px-4 py-12">
        <div className="space-y-8 ">
          {/* Section Header */}
          <div className="text-center space-y-4 animate-slide-in-from-bottom delay-200">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-900 via-amber-800 to-blue-950 bg-clip-text text-transparent animate-gradient-shift">
              Discover Amazing Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through thousands of job openings from top companies worldwide
            </p>
          </div>

          {/* Filters */}
          <JobFilters
            searchTerm={searchTerm}
            location={location}
            jobType={jobType}
            salaryRange={salaryRange}
            onSearchChange={setSearchTerm}
            onLocationChange={setLocation}
            onJobTypeChange={setJobType}
            onSalaryRangeChange={setSalaryRange}
            onClearFilters={clearFilters}
            resultCount={filteredJobs?.length}
          />
          </div>
          </div>


          {
            isLoading ? (
              <>
               <div className="grid lg:grid-cols-2 gap-8 px-4 md:px-2">
            {/* Jobs List */}
            <div className="space-y-4 h-auto pb-3 overflow-hidden lg:overflow-y-auto pr-0 lg:pr-2">
              {/* map skeletons into an array of 5 */}
              {[...Array(5)].map((_, index) => (
                <JobApplicationSkeleton key={index} />
              ))}
              </div>
              <div className="hidden lg:block sticky top-4 h-auto">
                <JobDetailsSkeleton />
                </div>
                </div>
              </>
            ) : (
              <>
                {/* Case 1: Search with no results (priority) */}
                {searchTerm && filteredJobs?.length === 0 && (
                   <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-12 pb-12">
            <div className="text-center max-w-md mx-auto">
              {/* Animated Icon Container */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl flex items-center justify-center mx-auto border border-border/50 animate-in fade-in-0 zoom-in-95 duration-700">
                  <Search className="h-9 w-9 text-muted-foreground/70 animate-in slide-in-from-bottom-2 duration-1000 delay-300" />
                </div>
                {/* Floating particles animation */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary/20 rounded-full animate-bounce delay-700"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce delay-1000"></div>
              </div>

              {/* Content with staggered animations */}
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
                <h3 className="text-xl font-semibold text-foreground text-balance">No  jobs found</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  We couldn't find any jobs matching your criteria. Check back later for
                  new opportunities.
                </p>
              </div>

              {/* Action buttons with hover animations */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-700">
                <Button
                         
                          onClick={() => {
                            setSearchTerm("")
                            setJobType("all")
                            setSalaryRange("all")
                            setLocation("")
                          }}
                          variant="default"
                  className="flex-1 group transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Clear All Filters
                        </Button>
              
                 
                <Button
                onClick={() => router.refresh()}
                  variant="outline"
                  className="flex-1 group transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:bg-muted/50 bg-transparent"
                >
                  <RefreshCw className="h-4 w-4 mr-2 transition-transform group-hover:rotate-180 duration-300" />
                  Refresh
                </Button>
              </div>

              {/* Subtle help text */}
              <p className="text-xs text-muted-foreground/60 mt-6 animate-in fade-in-0 duration-1000 delay-1000">
                Need help? Contact our support team for assistance.
              </p>
            </div>
          </CardContent>
        </Card>
                )}
          
                {/* Case 2: No jobs at all in the db */}
                {!searchTerm && filteredJobs?.length === 0 && (
                  <EmptyState title="" />
                )}
          
                {/* Case 3: Show jobs grid */}
                  {/* Jobs Layout */}
          <div className="grid lg:grid-cols-2 gap-8 px-4 md:px-2">
            {/* Jobs List */}
            <div className="space-y-4 h-auto pb-3 overflow-hidden lg:overflow-y-auto pr-0 lg:pr-2">
              {filteredJobs?.slice(0, 10).map((job, index) => (
                <div
                  key={job.id}
                  className="animate-in slide-in-from-left duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <JobCard
                    job={job}
                    isSelected={selectedJob?.id === job.id}
                    onClick={() => handleJobSelect(job)}
                    onApply={() => handleApply(job)}
                  />
                  <MobileJobCard
                    job={job}
                   
                    onApply={() => handleApply(job)}
                  />
                </div>
              ))}
              
            </div>
            
           {/* Job Details Panel - Hidden on mobile, shown on large screens */}
            <div className="hidden lg:block sticky top-4 h-auto">
             {filteredJobs?.length > 0 && !isLoading && <JobDetailsPanel job={selectedJob || filteredJobs[0]} 
              onApply={() => selectedJob && handleApply(selectedJob)} />}
            </div>
            </div>
              </>
            )
          }
              

        


               {/* Featured Companies Section */}
      <div className="bg-gradient-to-br  mt-2  py-16">
        <div className="container mx-auto px-4">
          <FeaturedCompanies onCompanyClick={handleCompanySearch} />
        </div>
      </div>
      {/* Application Modal */}
        {/* Application Modal */}
      <JobApplicationModal
        job={applicationJob}
        isOpen={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false)
          setApplicationJob(null)
        }}
      />

    </div>
  )
}
