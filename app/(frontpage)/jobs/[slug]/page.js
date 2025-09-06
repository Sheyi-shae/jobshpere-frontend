import { MobileJobDetails } from '@/components/_frontpage/mobile-jobdetails'
import React from 'react'

export default async function Page({ params }) {

    const {slug} = await params
  return (
    <div>
       <MobileJobDetails
        slug={slug }
        />
    </div>
  )
}
