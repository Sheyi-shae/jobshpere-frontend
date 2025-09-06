"use client"

import { formatCurrency } from "@/libs/currencyFormat"
import timeAgo from "@/libs/timeAgo"
import { MapPin, Calendar, Mail, Phone, Eye, DollarSign, Sparkle,  } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"
import JobDropdown from "../_jobs/job-dropdown"
import JobDetailsDialog from "../_jobs/job-details-dialog"

export default function AllApplicationsCard({
  application,
  statusInfo,
  StatusIcon,
  handleAnalyzeResume,

  selectedApplication,
  mutation,
  handleDownload,
  updateApplicationStatus,
  setSelectedApplication,

  subscriptionStatus,
}) {
  const borderColor = statusInfo.color.replace("bg", "border-l")


  //update application status

  

  return (
    <Card key={application.id} className={` ${borderColor}  hover:shadow-lg transition-all  duration-200 border-l-4`}>
      <CardContent className="pt-4 sm:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="flex items-center sm:items-start gap-3 sm:gap-0">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 border-2 sm:border-4 border-white shadow-lg flex-shrink-0">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm sm:text-lg font-semibold">
                {application.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="sm:hidden flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold capitalize truncate">{application.fullName}</h3>
                <Badge
                  className={`${statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor} border text-xs flex-shrink-0`}
                >
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {statusInfo.label}
                </Badge>
              </div>
              <p className="text-base font-medium text-blue-600 truncate">{application.job.title}</p>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="hidden sm:flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl capitalize font-semibold">{application.fullName}</h3>
                  <Badge className={`${statusInfo.bgColor} ${statusInfo.textColor} ${statusInfo.borderColor} border`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
                <p className="text-lg font-medium text-blue-600">{application.job.title}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(application.job.salaryMin)} - {formatCurrency(application.job.salaryMax)}
                  </span>
                </div>
                {application.aiScore !== null && (
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Match Score</div>
                    <div className="flex items-center gap-2">
                      <Progress value={application.aiScore || 50} className="w-20 h-2" />
                      <span className="text-sm font-semibold text-green-600">{application.aiScore}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:hidden space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-green-600">
                    {formatCurrency(application.job.salaryMin)} - {formatCurrency(application.job.salaryMax)}
                  </span>
                </div>
                {application.aiScore !== null && (
                  <div className="flex items-center gap-2">
                    <Progress value={application.aiScore || 50} className="w-16 h-2" />
                    <span className="text-xs font-semibold text-green-600">{application.aiScore}%</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{application.job.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                {application.job.jobViews.length || 0}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                {timeAgo(application.createdAt)}
              </span>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 sm:line-clamp-2">
              {application.job.description}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-2">
              {application.job.tags.slice(0, 5).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200 text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
              {application.job.tags.length > 5 && (
                <Badge variant="secondary" className="bg-gray-100 text-xs sm:text-sm">
                  +{application.tags.length - 5} more
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 flex-shrink-0" />
                  <a href={`mailto:${application.email}`} className="text-blue-600 hover:underline truncate">
                    {application.email}
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                  <a href={`tel:${application.phone}`} className="text-green-600 hover:underline">
                    {application?.phone}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {!application.isAnalyzed && (
                  <Button
                    disabled={mutation.isPending || subscriptionStatus === "inactive"}
                    onClick={() => handleAnalyzeResume(application.job.id, application.resumeUrl, application.email)}
                    className="bg-blue-800 hover:bg-blue-900 text-slate-50 font-semibold py-2 sm:py-3 text-xs sm:text-sm flex-1 sm:flex-none"
                  >
                    <Sparkle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="hidden sm:inline">
                      {mutation.isPending ? "Making Analysis..." : "Analyze Resume"}
                    </span>
                    <span className="sm:hidden">{mutation.isPending ? "Analyzing..." : "Analyze"}</span>
                  </Button>
                )}

                {/* dialog */}
                <JobDetailsDialog
                  application={application}
                  selectedApplication={selectedApplication}
                  handleDownload={handleDownload}
                  setSelectedApplication={setSelectedApplication}
                />

                <JobDropdown application={application} updateApplicationStatus={updateApplicationStatus} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
