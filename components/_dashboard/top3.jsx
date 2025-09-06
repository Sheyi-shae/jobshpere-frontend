"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function Top3({activeJobPosts}) {
    const jobsWithHighViews = activeJobPosts?.reduce((top3, job) => {
  // insert job into top3 array in correct position
  let inserted = false;

  for (let i = 0; i < top3.length; i++) {
    if ((job.jobViews || 0) > (top3[i].jobViews || 0)) {
      top3.splice(i, 0, job); // insert at position i
      inserted = true;
      break;
    }
  }

  if (!inserted && top3.length < 3) {
    top3.push(job); // add at the end if not in top 3 yet
  }

  // keep only 3 highest
  if (top3.length > 3) {
    top3.pop();
  }

  return top3;
}, []);
  return (
     <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex">Top 3 Jobs 
                <Eye className="bg-amber-500 p-1 mr-2 rounded-sm" /></CardTitle>
            </CardHeader>
            <CardContent>
              {jobsWithHighViews?.length === 0 ? (
                <p className="text-gray-500">You have no active job postings.</p>
              ) : (
                <div className="space-y-4">
                  {jobsWithHighViews?.map((performer, index) => (
                    <div
                      key={performer.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                          {performer?.company?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{performer?.jobViews?.length}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="line-clamp-1 text-gray-900">{performer?.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{performer?.user?.email}
                        -{performer?.user?.role}</div>
                    </div>
                   
                  </div>
                ))}
              </div>)}
            </CardContent>
          </Card>
  )
}
