import { Card, CardContent } from "@/components/ui/card"

export function MetricCardSkeleton() {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Top colored border skeleton */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Icon container skeleton */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Change indicator skeleton */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-1">
          {/* Title skeleton */}
          <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>

          {/* Value skeleton */}
          <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>

          {/* Subtitle skeleton */}
          <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  )
}
