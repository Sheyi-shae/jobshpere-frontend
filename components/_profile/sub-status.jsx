"use client"

import { Calendar, CreditCard, AlertCircle, CheckCircle, Clock, Infinity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { formatDate } from "@/libs/formatDate"
import NextBillingDate from "./next-sub"



export function SubscriptionStatus({ subscription=[],isSubscribing,  onManage, onSubscribe }) {
    const jobPosts=subscription.jobPosts
    const jobPostsIncurrentMonth=jobPosts.filter(post =>
         new Date(post.createdAt).getMonth() === new Date().getMonth())
         const applications=subscription.applications
         const applicationsInCurrentMonth=applications.filter(app =>
           new Date(app.createdAt).getMonth() === new Date().getMonth()
         )
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"

      case "inactive":
        return "bg-red-100 text-red-800"
     
       
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "trial":
        return <Clock className="h-4 w-4" />
      case "expired":
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const totalFreeTierJobs= 10
  const totalFreeTierApplications= 50

  const jobPostingsPercentage = (jobPostsIncurrentMonth.length / totalFreeTierJobs) * 100
  const applicationsPercentage = (applicationsInCurrentMonth.length / totalFreeTierApplications) * 100

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <span>Current Subscription</span>
                <Badge className={`${getStatusColor(subscription.subscriptionStatus)} flex items-center space-x-1`}>
                  {getStatusIcon(subscription.subscriptionStatus)}
                  <span className="capitalize">{subscription.subscriptionStatus}</span>
                </Badge>
              </CardTitle>
              <CardDescription>
                {subscription.subscriptionStatus === "active"
                  ? `29$/month`
                  : `Free plan`}
              </CardDescription>
            </div>
            <div className="text-right">
              <Button onClick={onManage} variant="outline" size="sm">
                Manage Subscription
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <NextBillingDate subscription={subscription} />
                 </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-sm text-gray-600">{'card'}</p>
              </div>
            </div>
          </div>

          {(subscription.subscriptionStatus === "inactive" || subscription.subscriptionStatus === "cancelled") && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm font-medium text-red-800">
                  {subscription.subscriptionStatus === "inactive"
                    ? "Your subscription is inactive"
                    : "Your subscription has been cancelled"}
                </p>
              </div>
              <p className="text-sm text-red-600 mt-1">Renew your subscription to continue using all features.</p>
              <Button onClick={onSubscribe} disabled={isSubscribing} className="mt-3 bg-red-600 hover:bg-red-700">
               {isSubscribing ? 'Please wait' : 'Subscribe Now'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Usage This Month</CardTitle>
          <CardDescription>Track your current usage against your plan limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Job Postings</span>
              <span>
                {subscription.subscriptionStatus === "active" ?
                 (<span className="text-green-600 flex">
                  {jobPostsIncurrentMonth.length} / <Infinity size={18}/></span>) 
                  : (<span className="text-gray-600">{jobPostsIncurrentMonth.length} / {totalFreeTierJobs}</span>)}
              </span>
            </div>
            {subscription.subscriptionStatus === "inactive" && (
              <Progress value={jobPostingsPercentage} className="h-2" />
            )}
            {subscription.subscriptionStatus === "inactive" && jobPostingsPercentage > 80 && (
              <p className="text-xs text-amber-600">You're approaching your job posting limit</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Applications Received</span>
              <span>
                {subscription.subscriptionStatus === "active" ?
                 (<span className="text-green-600 flex">
                  {applicationsInCurrentMonth.length} / <Infinity size={18}/></span>) : (<span className="text-gray-600">{applicationsInCurrentMonth.length} / {totalFreeTierApplications}</span>)}
              </span>
            </div>
            {subscription.subscriptionStatus === "inactive" && (
              <>
                <Progress value={applicationsPercentage} className="h-2" />
                {applicationsPercentage > 80 && (
                  <p className="text-xs text-amber-600">You're approaching your application limit</p>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
