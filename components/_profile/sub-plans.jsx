"use client"


import { useState } from "react"
import { Check, Star, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"



const plans = [
  {
    id: "inactive",
    name: "Free",
    price: 0,
    interval: "month",
    description: "Perfect for small teams getting started",
    features: [
      "Unlimited job postings",
      "Basic applicant tracking",
      "Email support",
      "Standard templates",
      "Recieve upto 500 applications",
      "Basic analytics",
    ],
    icon: <Zap className="h-6 w-6" />,
    color: "from-gray-600 to-amber-500",
  },
  {
    id: "active",
    name: "Professional",
    price: 29,
    interval: "month",
    description: "Ideal for growing companies",
    features: [
      "Unlimited job postings",
      "Advanced applicant tracking",
      "Priority support",
      "Custom templates",
      "Advanced analytics",
      "Team collaboration",
      "Time-saving superpower (AI analysis)",
      "Recieve unlimited applications",
    ],
    popular: true,
    icon: <Star className="h-6 w-6" />,
    color: "from-amber-500 to-blue-800",
  },
  
]



export function SubscriptionPlans({ isSubscribing, subscription=[] , handleSubscription}) {

  

  const currentPlan = subscription.subscriptionStatus


  return (
    <div className="space-y-8">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors bg-white text-gray-900 shadow-sm" "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly
          </button>
          
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => {
         
          const isCurrentPlan = currentPlan === plan.id
          
          return (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl 
              } ${isCurrentPlan ? "ring-2 ring-slate-500" : ""}`}
            >
              {isCurrentPlan ? (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`bg-gradient-to-r ${plan.color}
                   text-white text-center py-2 text-sm font-medium`}>
                    Current Plan
                  </div>
                </div>
              ):plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`bg-gradient-to-r ${plan.color}
                   text-white text-center py-2 text-sm font-medium`}>
                    Most Popular
                  </div>
                </div>

              )}


              
              <CardHeader className={`text-center ${plan.popular ? "pt-12" : "pt-6"}`}>
                <div
                  className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}
                >
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{"month"}</span>
                 
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {/* {plan.id !== "active" && <Button
                  // className={`w-full ${
                  //   isCurrentPlan
                  //     ? ""
                  //     : plan.popular
                  //       ? ""
                  //       : ""
                  // }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan && "Current Plan"}
                </Button>} */}
                {plan.id !== currentPlan && 
                 (<Button disabled={isCurrentPlan || plan.id==='inactive' || plan.id==='inactive' || isSubscribing} 
                 className="w-full bg-gradient-to-r from-amber-500 to-blue-800 hover:from-amber-600
                  hover:to-blue-900" onClick={() => handleSubscription()}
                  >{isSubscribing ? "Please wait..." : "Get Started"}</Button>)}
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
