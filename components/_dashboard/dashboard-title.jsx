import React from 'react'

export default function DashboardTitle({title,subTitle}) {
  return (
    <div>
              <h1 className="text-3xl capitalize bg-gradient-to-r from-slate-600 to-blue-800 bg-clip-text text-transparent font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground">{subTitle}</p>
            </div>
  )
}
