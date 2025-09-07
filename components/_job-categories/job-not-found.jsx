"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, RefreshCw, ArrowLeftToLine } from "lucide-react"
import { useRouter } from "next/navigation";

export default function EmptyState({ title,mode }) {
    const router = useRouter();
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
       

        {/* Modern Empty State Component */}
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
                <h3 className="text-xl font-semibold text-foreground text-balance">No {title} jobs found</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  We couldn't find any jobs matching your criteria. Check back later for
                  new opportunities.
                </p>
              </div>

              {/* Action buttons with hover animations */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-700">
              {mode !=='homepage' && <Button
                onClick={() => router.back()}
                  variant="default"
                  className="flex-1 group transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ArrowLeftToLine className="h-4 w-4 mr-2 transition-transform group-hover:rotate-90 duration-200" />
                  Go Back
                </Button>}
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
      </div>
    </div>
  )
}
