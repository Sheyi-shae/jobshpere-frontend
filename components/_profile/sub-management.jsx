"use client"

import { useState } from "react"
import { CreditCard, Download, Settings, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"


export function SubscriptionManagement({
  onUpdatePayment,
  onDownloadInvoice,
  onCancelSubscription,
}) {
  const [autoRenew, setAutoRenew] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [usageAlerts, setUsageAlerts] = useState(true)

  return (
    <div className="space-y-6">
      {/* Payment & Billing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment & Billing</span>
          </CardTitle>
          <CardDescription>Manage your payment methods and billing preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Method</p>
              <p className="text-sm text-gray-600">•••• •••• •••• 4242</p>
            </div>
            <Button onClick={onUpdatePayment} variant="outline" size="sm">
              Update
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Download Invoice</p>
              <p className="text-sm text-gray-600">Get your latest billing statement</p>
            </div>
            <Button onClick={onDownloadInvoice} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Subscription Settings</span>
          </CardTitle>
          <CardDescription>Configure your subscription preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-renew">Auto-renewal</Label>
              <p className="text-sm text-gray-600">Automatically renew your subscription each billing cycle</p>
            </div>
            <Switch id="auto-renew" checked={autoRenew} onCheckedChange={setAutoRenew} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive billing and subscription updates via email</p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="usage-alerts">Usage Alerts</Label>
              <p className="text-sm text-gray-600">Get notified when approaching plan limits</p>
            </div>
            <Switch id="usage-alerts" checked={usageAlerts} onCheckedChange={setUsageAlerts} />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security</span>
          </CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions that affect your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Cancel Subscription</p>
              <p className="text-sm text-gray-600">Cancel your subscription and lose access to premium features</p>
            </div>
            <Button onClick={onCancelSubscription} variant="destructive" size="sm">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
