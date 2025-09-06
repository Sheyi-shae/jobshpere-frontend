import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {

  Download,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatCurrency } from '@/libs/currencyFormat'
import timeAgo from '@/libs/timeAgo'

export default function JobDetailsDialog({ selectedApplication ,handleDownload,setSelectedApplication,application}) {
  return (
     <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedApplication(application)}
                              className="bg-amber-500 hover:bg-amber-600"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-full md:max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage
                                    src={selectedApplication?.avatar || "/placeholder.svg"}
                                    alt={selectedApplication?.fullName}
                                  />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    {selectedApplication?.fullName
                                      ?.split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div>{selectedApplication?.fullName}</div>
                                  <div className="text-sm text-muted-foreground font-normal">
                                    {selectedApplication?.job?.title}
                                  </div>
                                </div>
                              </DialogTitle>
                            </DialogHeader>
                            {selectedApplication && (
                              <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                  <TabsTrigger value="overview">Overview</TabsTrigger>
                                  <TabsTrigger value="resume">Resume</TabsTrigger>
                                  <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                                  <TabsTrigger value="notes">Notes</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <h4 className="font-semibold">Contact Information</h4>
                                      <div className="space-y-1 text-sm">
                                        <div>📧 {selectedApplication.email}</div>
                                        <div>📞 {selectedApplication.phone}</div>
                                        <div>📍 {selectedApplication.job?.location}</div>
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <h4 className="font-semibold">Application Details</h4>
                                      <div className="space-y-1 text-sm">
                                        <div>💰 Salary: 
                                            {formatCurrency(application.job.salaryMin)} - {formatCurrency(application.job.salaryMax)}
                          
                                        </div>
                                        <div>📅 Applied: {timeAgo(selectedApplication.createdAt)}</div>
                                        
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Skills & Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedApplication.job?.tags?.map((skill, index) => (
                                        <Badge
                                          key={index}
                                          className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Summary</h4>
                                    <p className="text-muted-foreground">{selectedApplication.job?.description}</p>
                                  </div>
                                </TabsContent>
                                <TabsContent value="resume">
                                  <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <Download className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">Resume</h3>
                                    <p className="text-muted-foreground mb-4">
                                      View or download the candidate's resume
                                    </p>
                                    <Button onClick={()=>handleDownload(selectedApplication?.resumeUrl)} className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                                      
                                      <Download className="h-4 w-4 mr-2" />
                                      Download Resume
                                    </Button>
                                  </div>
                                </TabsContent>
                                <TabsContent value="cover-letter">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Cover Letter</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p className="text-muted-foreground leading-relaxed">
                                        {selectedApplication?.coverLetter}
                                      </p>
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="notes">
                                  <div className="space-y-4">
                                    <h4 className="font-semibold">Internal Notes</h4>
                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                      <p className="text-sm text-yellow-800">
                                        Add your notes and feedback about this candidate here...
                                      </p>
                                    </div>
                                  </div>
                                </TabsContent>
                              </Tabs>
                            )}
                          </DialogContent>
                        </Dialog>
  )
}
