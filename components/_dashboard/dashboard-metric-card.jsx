"use client"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight,ArrowDownRight } from "lucide-react"
import CountUp from 'react-countup';

export function MetricCard({ title, value, change, icon: Icon, color, subtitle }) {
  
  
 

 
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`}></div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        {change &&  <div className="flex items-center gap-1">
            {change > 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${change > 0 ? "text-green-500" : "text-red-500"}`}>
              {Math.abs(change)}%
            </span>
          </div>}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className="text-3xl font-bold text-gray-900">
           {Number.isFinite(Number(value)) ? (
            <CountUp end={Number(value)} duration={2} />
          ) : (
            value
          )}
          </div>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}