import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2, FileText, DollarSign, Tag } from "lucide-react"

export default function JobFormSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-32" />
                <span className="text-3xl font-bold text-gray-900">-</span>
                <Skeleton className="h-9 w-40" />
              </div>
              <Skeleton className="h-5 w-64 mt-1" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r py-4 from-slate-300 to-blue-400 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Building2 className="h-5 w-5 text-blue-600" />
                Basic Information
              </CardTitle>
              <CardDescription>Start with the essential details about your job opening</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r py-4 from-slate-300 to-amber-400 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-green-600" />
                Job Description
              </CardTitle>
              <CardDescription>
                Describe the role, responsibilities, and what makes this opportunity special
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Compensation & Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compensation */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r py-4 from-yellow-50 to-orange-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                  Compensation
                </CardTitle>
                <CardDescription>Optional salary range information</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Skills & Tags */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r py-4 from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Tag className="h-5 w-5 text-purple-600" />
                  Skills & Tags
                </CardTitle>
                <CardDescription>Add relevant skills and technologies</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-11 flex-1" />
                  <Skeleton className="h-11 w-11" />
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-18" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings & Actions */}
          <Card className="shadow-lg border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4" />
                  <div>
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-32 mt-1" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Skeleton className="h-11 w-28" />
                  <Skeleton className="h-11 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
