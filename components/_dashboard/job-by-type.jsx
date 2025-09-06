"use client"


import {useMemo} from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
 
  PieChart,
  Pie,
  Cell,
  
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import percentageCalc from "@/libs/percentageCalc"

export default function JobByType({applications}) {
    const jobDistributionData = (applications = []) => {
      const counts = applications.reduce((acc, app) => {
        const jobType = app?.job?.type || "Unknown";
        acc[jobType] = (acc[jobType] || 0) + 1;
        return acc;
      }, {});
    
      
      const colors = {
        remote: "#3B82F6",      // blue
        onsite: "#10B981",      // green
        hybrid: "#F59E0B",      // amber
        contract: "#6366F1",    // indigo
        internship: "#8B5CF6",  // violet
        Unknown: "#9CA3AF",     // gray
       
      };

     
    
      // convert object → array of {name, value, color}
      return Object.entries(counts).map(([name, value]) => ({
        name,
        value,
        color: colors[name] || "#000000", 
      }));
    };
    
    const jobTypeData = useMemo(() => jobDistributionData(applications ?? []), [applications]);
    

  return (
   <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Job Applications by Type</CardTitle>
            </CardHeader>
            <CardContent>
              {applications?.length === 0 ? (
                <p className="text-gray-500 flex items-center">No applications found.</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={jobTypeData}
                      cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {jobTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>)}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {jobTypeData.map((source, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                    <span className="text-xs text-gray-600">{source.name}</span>
                    <span className="text-xs font-medium text-gray-900">{percentageCalc(source.value,applications?.length)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
  )
}
