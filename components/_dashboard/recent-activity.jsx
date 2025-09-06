"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {Clock,} from "lucide-react"
import timeAgo from "@/libs/timeAgo"


export default function RecentActivity({activity=[]}) {
    const sortedActivity= activity?.slice().sort((a,b)=>
        new Date(b.createdAt)- new Date(a.createdAt)).slice(0,10)
    
    const activityTypes = [
  { type: "JOB_UPDATED", label: "Updated", className: "bg-yellow-100 text-yellow-700" },
  { type: "JOB_POSTED", label: "Posted", className: "bg-blue-100 text-blue-700" },
  { type: "APPLIED", label: "Applied", className: "bg-purple-100 text-purple-700" },
  { type: "CREATED_NEW_USER", label: "Added User", className: "bg-orange-100 text-orange-700" },
  { type: "SHORTLISTED", label: "Shortlisted", className: "bg-green-100 text-green-700" },
  { type: "SCREENED_OUT", label: "Screened Out", className: "bg-red-100 text-red-700" },
  { type: "HIRED", label: "Hired", className: "bg-emerald-100 text-emerald-700" },
  { type: "PAYMENT", label: "Payment", className: "bg-indigo-100 text-indigo-700" },
]

const getActivityConfig=(type)=>
  activityTypes.find((a) => a.type === type)



  return (
     <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activity.length === 0 && (<p className="text-gray-500">No recent activity found.</p>)}
            <div className="space-y-4">
              {sortedActivity?.slice(0, 10)?.map((activity) => {
                const config = getActivityConfig(activity.type)
                return (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                    <AvatarFallback className="bg-gradient-to-r from-gray-500 to-gray-600 text-white">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium capitalize text-gray-900">{activity.user}</span>
                      <span className="text-gray-600 lowercase"> {activity.action}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {timeAgo(activity.createdAt)}
                    </div>
                  </div>
                 
                <div className="flex items-center gap-2">
               
                  {config && <Badge className={config.className}>{config.label}</Badge>}  </div>

                </div>
)})}
            </div>
          </CardContent>
        </Card>
  )
}
