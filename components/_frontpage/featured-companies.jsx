"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Users, Briefcase, Star, ExternalLink } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"




export function FeaturedCompanies({ onCompanyClick }) {


    const {
      data,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['public-company'],
      queryFn: async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/company`, );
        return res.data.data;
      },
      
    });
  
  const handleCompanyClick = (company) => {
    if (onCompanyClick) {
      onCompanyClick(company.name)
    }
  }
// sort data by subscriptionStatus
const sortData=data?.sort((a,b)=>{
  if(a.subscriptionStatus === 'active' && b.subscriptionStatus !== 'active') return -1;
  if(a.subscriptionStatus !== 'active' && b.subscriptionStatus === 'active') return 1;
  return 0;
});
  return (
    <div className="space-y-8">
      {/* Section Header */}
       <div className="mb-8 animate-fade-in-up">
          <div className="text-center space-y-4 animate-slide-in-from-bottom delay-200">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 via-amber-600  to-blue-900 bg-clip-text text-transparent animate-gradient-shift">
              Featured Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-500">
              Join thousands of professionals working at these amazing companies
            </p>
          </div>
        </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortData?.map((company, index) => (
          <Card
            key={company.id}
            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl group ${
              company.featured
                ? "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg"
                : "bg-gradient-to-br from-white to-gray-50 hover:shadow-lg"
            }`}
            onClick={() => handleCompanyClick(company)}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <CardContent className="p-6 text-center space-y-4">
              {/* Company Logo */}
              <div className="relative">
                <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow">
                  <AvatarImage src={company.logo || ""} alt={company.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                    {company.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {company.subscriptionStatus==='active' && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className=" px-2 py-1 bg-white shadow-lg">
                      <Star className="text-amber-500" size={18}/>
                    </Badge>
                  </div>
                )}
              </div>

              {/* Company Info */}
              <div className="space-y-2">
                <h3 className="text-lg capitalize font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{company?.description}</p>
              </div>

              {/* Company Details */}
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center line-clamp-1 justify-center gap-1">
                  {company.website && (
                 
                    <a className="line-clamp-1" href={company.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>

             

              {/* Open Positions */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2">
                  <Briefcase className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600">
                    {company.jobPosts.length || 0} open position{company.jobPosts.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs text-blue-600 font-medium">Click to view jobs →</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-800 via-slate-800 to-blue-800 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm opacity-90">Partner Companies</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">
              {data?.reduce((total, company) => total + company.jobPosts.length, 0)}+
            </div>
            <div className="text-sm opacity-90">Open Positions</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">50k+</div>
            <div className="text-sm opacity-90">Professionals Hired</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">95%</div>
            <div className="text-sm opacity-90">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">Want to see your company featured here?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
         <Link href={'/join'}>
           <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
             Post Jobs for Free
           </button>
         </Link>
        </div>
      </div>
    </div>
  )
}
