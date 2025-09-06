"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Clock, DollarSign, Briefcase, Users, Star, Heart } from "lucide-react"
import timeAgo from "@/libs/timeAgo"
import useAuthStore from "@/stores/useAuthStore"
import { useEffect, useRef } from "react"
import axios from "axios"
import { useQueryClient } from "@tanstack/react-query"
import { formatCurrency } from "@/libs/currencyFormat"





export function JobCard({ job, isSelected, onClick, onApply }) {
 //fetch company slug and job slug from job object
 const slug = job.company?.slug 
  const jobSlug = job.slug
  const ref = useRef();
    const queryClient = useQueryClient();


  useEffect(() => {
     if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/views/${slug}/${jobSlug}`)
          .then(() => {
            queryClient.invalidateQueries(['jobs'])
          })
          .catch(() => {});
        observer.unobserve(entry.target); 
        
      }
    });

    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [slug, jobSlug]);


  return (
    <Card
      ref={ref}
      className={`cursor-pointer hidden lg:grid transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
        isSelected
          ? "ring-2 ring-blue-500 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50"
          : "hover:shadow-lg bg-gradient-to-br from-white to-gray-50"}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                <AvatarImage src={job.company?.logo || "/placeholder.svg"} alt={job.company?.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {job.company?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold capitalize text-lg text-gray-900 line-clamp-1">{job.title}</h3>
                <p className="text-blue-600 font-medium">{job.company?.name}</p>
              </div>
            </div>
            
          </div>

          {/* Job Info */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-green-500" />
                <span>{job.location}</span>
               
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-blue-500" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <span className="font-medium text-emerald-600">
                  {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}</span>
              </div>
            </div>

            <p className="text-gray-700 line-clamp-2 leading-relaxed">{job.description}</p>

            <div className="flex flex-wrap gap-2">
              {job.tags.slice(0, 3).map((req, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200"
                >
                  {req}
                </Badge>
              ))}
              {job.tags.length > 3 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                  +{job.tags.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{timeAgo(job.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{job.applications.length} applicants</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500 hover:bg-red-50">
                <Heart className="h-4 w-4" />
              </Button>
              {/* <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onApply()
                }}
                size="sm"
                className="bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900  hover:from-blue-600 hover:to-indigo-600 text-white transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
              </Button> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
