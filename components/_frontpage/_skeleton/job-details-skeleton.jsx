import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function JobDetailsSkeleton() {
  return (
    <Card className="h-full overflow-y-auto bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            {/* Company Avatar */}
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse border-4 border-white shadow-lg"></div>

            <div className="flex-1 space-y-3">
              {/* Job Title */}
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>

              {/* Company Name */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Badge */}
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
            </div>
          </div>

          {/* Job Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Job Description */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </div>

        <Separator />

        {/* Requirements */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
          <div className="grid gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Application Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 -mx-6 -mb-6 border-t">
          <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}
