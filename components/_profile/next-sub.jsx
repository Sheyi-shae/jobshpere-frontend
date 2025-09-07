"use client"
import { formatDate } from "@/libs/formatDate"
import { useEffect, useState } from "react"

export default function NextBillingDate({ subscription }) {
  const [isBlinking, setIsBlinking] = useState(false)

  // Always declare hooks first, then handle conditional logic
  let endDate = null
  let diffInDays = null

  if (subscription?.subscriptionEndDate) {
    endDate = new Date(subscription.subscriptionEndDate)
    const today = new Date()
    const diffInMs = endDate.getTime() - today.getTime()
    diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24))
  }

  useEffect(() => {
    if (diffInDays !== null && diffInDays <= 3) {
      setIsBlinking(true)
    }
  }, [diffInDays])

  if (!endDate) {
    return <p className="text-sm text-gray-500">No billing date</p>
  }

  const baseClasses = "text-sm"
  let textClasses = "text-green-600"

  if (diffInDays <= 3) {
    textClasses = "text-red-600 animate-pulse font-semibold"
  } else if (diffInDays <= 7) {
    textClasses = "text-yellow-600 font-medium"
  }

  return (
    <div>
      <p className="text-sm font-medium">Next Billing Date</p>
      <p className={`${baseClasses} ${textClasses}`}>
        {formatDate(endDate)}
      </p>
    </div>
  )
}
