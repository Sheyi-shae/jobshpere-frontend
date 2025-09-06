"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  Users,
  Star,
  Building2,
  Award,
  CheckCircle,
  ExternalLink,
  EyeIcon,
} from "lucide-react"
import timeAgo from "@/libs/timeAgo"
import { formatCurrency } from "@/libs/currencyFormat"



export function JobDetailsPanel({ job, onApply }) {
  if (!job) {
    return (
      <Card className="h-full bg-gradient-to-br from-slate-50 to-blue-50">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Select a Job</h3>
              <p className="text-gray-600">Choose a job from the list to view details</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }


  return (
    <Card className="h-full overflow-y-auto bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src={job.company?.logo || "/placeholder.svg"} alt={job.company.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
                {job.company?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-medium text-blue-600">{job.company?.name}</span>
                <Button variant="ghost" size="sm" className="p-1">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                
                  <Badge className="">
                     <EyeIcon className="h-4 w-4" />  {job.jobViews.length} views
                  </Badge>
               
               <Badge>
                <Calendar className="h-4 w-4" /> {timeAgo(job.createdAt)}
               </Badge>
                
              </div>
            </div>
          </div>

          {/* Job Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-gray-900">Location</span>
              </div>
              <p className="text-gray-700">{job.location}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="h-5 w-5 text-green-500" />
                <span className="font-medium text-gray-900">Job Type</span>
              </div>
              <p className="text-gray-700">{job.type}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-emerald-500" />
                <span className="font-medium text-gray-900">Salary</span>
              </div>
              <p className="text-gray-700 font-semibold">{formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span className="font-medium text-gray-900">Applicants</span>
              </div>
              <p className="text-gray-700">{job.applications.length} applied</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Job Description */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            Job Description
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>
        </div>

        <Separator />

        {/* Requirements */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Requirements
          </h2>
          <div className="grid gap-2">
            {job.tags.map((req, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-gray-700">{req}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

       

        <Separator />

        {/* Application Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Posted on {timeAgo(job.createdAt)}</span>
          </div>
        </div>

        {/* Apply Button */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 -mx-6 -mb-6 border-t">
          <Button
            onClick={onApply}
            className="w-full h-12 bg-gradient-to-r from-blue-800 via-slate-900 to-blue-700 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Apply for this Position
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
