import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function JobApplicationSkeleton() {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-gray-300">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Checkbox skeleton */}
          <Skeleton className="w-4 h-4 mt-1 rounded" />

          {/* Avatar skeleton */}
          <Skeleton className="w-16 h-16 rounded-full" />

          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {/* Name skeleton */}
                  <Skeleton className="h-6 w-40" />
                  {/* Status badge skeleton */}
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                {/* Job title skeleton */}
                <Skeleton className="h-5 w-48 mb-2" />

                {/* Job details (location, views, date) */}
                <div className="flex flex-wrap items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {/* Salary range skeleton */}
                <Skeleton className="h-4 w-32" />

                {/* Match score section */}
                <div className="text-right">
                  <Skeleton className="h-3 w-20 mb-1" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-20 h-2 rounded-full" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              </div>
            </div>

            {/* Job description skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Skills/tags skeleton */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
              <Skeleton className="h-6 w-18 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Contact and actions section */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                {/* Email skeleton */}
                <Skeleton className="h-4 w-32" />
                {/* Phone skeleton */}
                <Skeleton className="h-4 w-28" />
              </div>

              {/* Action buttons skeleton */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-28 rounded" />
                <Skeleton className="h-8 w-24 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
