"use client"

import { useState } from "react"
import { ArrowLeft, CreditCard, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SubscriptionPlans } from "./sub-plans" 
import { SubscriptionStatus } from "./sub-status" 
import { SubscriptionManagement } from "./sub-management" 
import { useCompanyProfile } from "@/libs/custom-react-query"
import { useParams } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { SubscriptionStatusSkeleton } from "../_skeleton/subscription-skeleton"




export default function SubscriptionPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentPlan, setCurrentPlan] = useState("professional")
  const [isSubscribing, setSubscribing]=useState(false)

  const handleSelectPlan = (planId) => {
    //console.log("Selected plan:", planId)
    // Implement plan selection logic
  }


  const handleManage = () => {
    setActiveTab("manage")
  }

  const handleUpdatePayment = () => {
   // console.log("Updating payment method")
    // Implement payment update logic
  }




  const handleCancelSubscription = () => {
    //console.log("Cancelling subscription")
    // Implement cancellation logic
  }


   const params = useParams();
    const { slug } = params;

  const { data, isLoading, isError, error } = useCompanyProfile(slug);

 const handleSubscription = async () => {
  
  setSubscribing(true);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${slug}/subscribe`,
      null,
      { withCredentials: true }
    );
    if (res.data.success && res.data.url) {
      // open Stripe checkout in a popup window
      const width = 800;
      const height = 900;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      window.open(
        res.data.url,
        "StripeCheckout",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
      );
    }
  } catch (err) {
   toast.error(err?.response?.data?.message || "Failed to initiate subscription.");
  }finally{
    setSubscribing(false);
  }
};


//download invoice
  const handleDownloadInvoice = async () => {
   try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${slug}/invoice/${data.stripeSubscriptionId}`,
      
      { withCredentials: true }
    );
  //console.log(res.data);
  } catch (err) {
   toast.error("No active subscription");
  }finally{
  
  }
};

  if (isLoading) {
    return <SubscriptionStatusSkeleton/>;
  }
  


  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
              <p className="text-gray-600 mt-2">Manage your subscription, billing, and account preferences</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Plans</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Manage</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SubscriptionStatus
             onSubscribe={handleSubscription} subscription={data} isSubscribing={isSubscribing}  onManage={handleManage} />
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Select the perfect plan for your hiring needs</p>
            </div>
            <SubscriptionPlans isSubscribing={isSubscribing} handleSubscription={handleSubscription} subscription={data} onSelectPlan={handleSelectPlan} currentPlan={currentPlan} />
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <SubscriptionManagement
              onUpdatePayment={handleUpdatePayment}
              onDownloadInvoice={handleDownloadInvoice}
              onCancelSubscription={handleCancelSubscription}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
