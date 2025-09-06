"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
  AreaChart,
  Area,
 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { extractMonthShort } from "@/libs/currencyFormat";



export default function ApplicationTrend({ applications=[] }) {
   
 // Sort applications by createdAt (newest first)
const sortedApplications = (applications || [])
  .slice()
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const currentYear = new Date().getFullYear()
const monthlySummary = sortedApplications
  .filter(app => new Date(app.createdAt).getFullYear() === currentYear) // only current year
  .reduce((acc, app) => {
    const month = extractMonthShort(app.createdAt);

  if (!acc[month]) {
    acc[month] = {
      month,
      applications: 0,
      shortlists: 0,
      screened_out: 0
    };
  }

  acc[month].applications++;
  if (app.status === "shortlisted") acc[month].shortlists++;
  if (app.status === "screened_out") acc[month].screened_out++;

  return acc;
}, {});

// Convert object → array

const summaryArray = Object.values(monthlySummary);

  return (
    <div className="grid grid-cols-1 ">
          {/* Application Trends */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Application Trends</CardTitle>
                <Badge className="bg-blue-100 text-blue-700">12 months-{currentYear}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={summaryArray}>
                  <defs>
                    <linearGradient id="applications" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="shortlists" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="screened_out" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff0000" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff0000" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#applications)"
                  />
                  <Area type="monotone" dataKey="shortlists" stroke="#8B5CF6" strokeWidth={2} fill="url(#shortlists)" />
                  <Area type="monotone" dataKey="screened_out" stroke="#ff0000" strokeWidth={2} fill="url(#screened_out)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

         
        </div>
  )
}
