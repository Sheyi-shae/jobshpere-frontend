"use client"
import { Card, CardContent } from "@/components/ui/card"


import {Users,  Globe,ExternalLink, BadgeCent,BadgeInfo} from "lucide-react"
import DescriptionDialog from "./description-dialog"


export default function CompanyInfo({data=[]}) {

  

    //filter active jobs
    const activeJobs = data.jobPosts?.filter(job => job.isActive) || []
  return (
     <div className="pt-20">
        <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-4xl line-clamp-1 capitalize font-bold bg-gradient-to-r from-blue-800 to-blue-950 bg-clip-text text-transparent">
                      {data.name}
                    </h1>
                  
                   <DescriptionDialog 
                   slug={data.slug}
                    FetchedDescription={data.description} 
                    FetchedWebsite={data.website} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{data.description || ""}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Members</p>
                        <p className="text-muted-foreground">{data.users.length}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <BadgeCent className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Subscription Status</p>
                        <p className="text-muted-foreground">{data.subscriptionStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Website</p>
                        <a href={data.website||"#"} className="text-blue-600 hover:underline flex items-center gap-1">
                          {data.website || ""}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <BadgeInfo className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Subcription Id</p>
                         <p className="text-muted-foreground">{data.stripeCustomerId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Stats */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Company Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{data?.users?.length}</div>
                        <div className="text-sm text-muted-foreground">Dashboard Users</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{activeJobs.length}</div>
                        <div className="text-sm text-muted-foreground">Open Positions</div>
                      </div>
                    </CardContent>
                  </Card>
                  
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

  )
}
