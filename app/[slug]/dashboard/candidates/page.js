'use client'

import { SubscriptionStatusSkeleton } from '@/components/_skeleton/subscription-skeleton'

import useAuthStore from '@/stores/useAuthStore'
import { useRouter  } from 'next/navigation'

import React, { useEffect } from 'react'

export default function Page() {
    const router=useRouter()
    const user=useAuthStore((state)=> (state.user))
    
    const companySlug=user?.company?.slug
    useEffect(() => {
    if(user){
    router.replace(`/${companySlug}/dashboard/candidates/applications`)
  }
}, [user, companySlug, router])
  return (
    <div><SubscriptionStatusSkeleton/></div>
  )
}
