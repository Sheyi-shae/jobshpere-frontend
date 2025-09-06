import JobsPage from '@/components/_frontpage/jobs-page'
import { JobApplicationSkeleton } from '@/components/_skeleton/job-card-skeleton'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <div> 
      <Suspense fallback={<div><JobApplicationSkeleton/></div>}>
      <JobsPage/>
    </Suspense>
    </div>
  )
}
