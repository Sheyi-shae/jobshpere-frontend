"use client"
import React, { useMemo } from 'react'
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { JobFilters } from '@/components/_frontpage/job-filter'
import { JobDetailsPanel } from '@/components/_frontpage/desktop-jobdetails'
import { MobileJobCard } from '@/components/_frontpage/mobile-jobcard'
import { JobCard } from '@/components/_frontpage/job-card'

import { Card, CardContent } from "@/components/ui/card"
import { FolderOpen, Search } from "lucide-react"

import { JobApplicationSkeleton } from '@/components/_skeleton/job-card-skeleton'
import { JobDetailsSkeleton } from '@/components/_frontpage/_skeleton/job-details-skeleton'
import { Button } from '@/components/ui/button'
import { JobApplicationModal } from '@/components/_frontpage/application-modal'
import EmptyState from './job-not-found'


export default function AllJobs({ data,isLoading}) {
 
 
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
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some((req) => req.toLowerCase().includes(searchTerm.toLowerCase())),
    )
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
    <div>
       
           {/* Hero Section */}
        <div className="bg-gradient-to-br  from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
          <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Job</h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Discover thousands of opportunities from top companies worldwide
              </p>

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
          {/* Jobs Layout */}
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
                                <div className="hidden lg:block sticky top-4 h-[800px]">
                                  <JobDetailsSkeleton />
                                  </div>
                                  </div>
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
                                            No results for <strong>{searchTerm}.</strong> Try adjusting your search or filters.
                                          </p>
                                          <Button
                                            variant="outline"
                                            onClick={() => {
                                              setSearchTerm("")
                                              setJobType("all")
                                              setSalaryRange("all")
                                              setLocation("")
                                            }}
                                            className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
                                          >
                                            Clear All Filters
                                          </Button>
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
                            <div className="grid lg:grid-cols-2 mt-3 gap-8 px-4 md:px-2">
                              {/* Jobs List */}
                              <div className="space-y-4 h-auto pb-3 overflow-hidden lg:overflow-y-auto pr-0 lg:pr-2">
                                {filteredJobs?.map((job, index) => (
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
                              <div className="hidden lg:block sticky top-4 h-[800px]">
                               {filteredJobs?.length >0 &&!isLoading && <JobDetailsPanel job={selectedJob || filteredJobs[0]} 
                                onApply={() => selectedJob && handleApply(selectedJob)} />}
                              </div>
                              </div>
                                </>
                              )
                            }


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
