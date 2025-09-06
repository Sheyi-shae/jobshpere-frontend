import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CompanyProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Company Header Skeleton */}
      <div className="relative">
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="absolute -bottom-16 left-8">
          <Skeleton className="w-32 h-32 rounded-full border-4 border-white" />
        </div>
      </div>

      {/* Company Info Skeleton */}
      <div className="pt-20">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-10 w-80" />
                    <Skeleton className="h-9 w-28" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-4/5" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-36" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Stats Skeleton */}
              <div className="space-y-4">
                <Skeleton className="h-7 w-32" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <CardContent className="pt-4">
                        <div className="text-center space-y-2">
                          <Skeleton className="h-8 w-12 mx-auto" />
                          <Skeleton className="h-4 w-16 mx-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Section Skeleton */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-44" />
        </div>

        {/* Filters Skeleton */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  {/* Avatar and Role Badge */}
                  <div className="relative">
                    <Skeleton className="w-20 h-20 rounded-full mx-auto" />
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>

                  {/* Name and Department */}
                  <div className="space-y-2 pt-4">
                    <Skeleton className="h-6 w-32 mx-auto" />
                    <Skeleton className="h-5 w-24 mx-auto rounded-full" />
                  </div>

                  {/* Bio */}
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex items-center justify-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-16 mx-auto" />
                    <div className="flex flex-wrap justify-center gap-1">
                      {[1, 2, 3].map((j) => (
                        <Skeleton key={j} className="h-5 w-16 rounded-full" />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-2 pt-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
