"use client"


import {useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import percentageCalc from "@/libs/percentageCalc"

export default function HiringFunnel({ applications }) {
    //hiring funnel
const getHiringFunnelData = (apps = []) => {
  const total = apps.length;

  // single pass is cheaper than multiple filters
  const counts = apps.reduce((acc, a) => {
    acc.total++;
    if (a.status === "screened_out") acc.screened_out++;
    if (a.status === "shortlisted") acc.shortlisted++;
    return acc;
  }, { total: 0, screened_out: 0, shortlisted: 0 });


  return [
    { stage: "Applications", count: counts.total,        percentage: 100,   color: "bg-cyan-600" },
    { stage: "shortlisted", count: counts.shortlisted, percentage: percentageCalc(counts.screened_out, counts.total), 
        color: "bg-gradient-to-r from-emerald-500 to-green-500" },
    { stage: "screened out",  count: counts.screened_out, 
         percentage: percentageCalc(counts.shortlisted,  counts.total), color: "bg-red-500" },
  ];
};

const hiringFunnelData = useMemo(() => getHiringFunnelData(applications ?? []), [applications]);

  return (
      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Hiring Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hiringFunnelData?.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{stage.count}</span>
                        <span className="text-xs text-gray-400">({stage.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${stage.color}`}
                        style={{
                          width: `${stage.percentage}%`,
                         
                          animationDelay: `${index * 200}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
  )
}
