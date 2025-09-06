import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Archive,  Clock, Copy, Edit, ExternalLink, Eye, MoreHorizontal, Save, Trash2, Users } from 'lucide-react'
import { Badge } from '../ui/badge'
import { formatCurrency } from '@/libs/currencyFormat'
import Link from 'next/link'
import axios from 'axios'
import { DeleteAlertDialog } from './delete-alert'

export default function ActiveJobsDialog({setSelectedJob,selectedJob,job,slug,handleMoveJob, handlePublishJob}) {


  return (
    <div>
        <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      
                    </DialogTrigger>
                    
                    <DialogContent className=" w-full bg-amber-100 ring-1 ring-amber-200 md:max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{selectedJob?.title}</DialogTitle>
                        <DialogDescription>
                          {selectedJob?.location} • {selectedJob?.type}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedJob && (
                        <div className="space-y-4  ">
                          <div>
                            <h4 className="font-semibold mb-2">Job Description</h4>
                            <p className="text-muted-foreground">{selectedJob.description}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold  mb-2">Requirements</h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedJob.tags?.map((req, index) => (
                                
                                <Badge className={'bg-amber-500'} key={index} variant="secondary">
                                    
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Salary:</span> {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
                            </div>
                            <div>
                              <span className="font-medium">Applications:</span> {selectedJob?.applications?.length}
                            </div>
                            <div>
                              <span className="font-medium">Views:</span> {selectedJob?.jobViews?.length}
                            </div>
                           
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <div> <DeleteAlertDialog job={job} slug={slug}/></div>
                 

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                     <DropdownMenuItem>
                       <Link className='flex' href={`/${slug}/dashboard/edit?type=job-edit&slug=${job.slug}`}>
                         <Edit className="h-4 w-4 mr-2" />
                         Edit Job
                       </Link>
                      </DropdownMenuItem>
                    {job.isActive &&   <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        View Applications ({job.applications.length})
                      </DropdownMenuItem>}
                      
                       {job.isActive &&   
                       <Link href={`/jobs/${job.slug}`} target="_blank" rel="noopener noreferrer">
                       <DropdownMenuItem>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Public Listing
                      </DropdownMenuItem></Link>}
                      <DropdownMenuSeparator />

                     {job.isActive ? <DropdownMenuItem onClick={() => handleMoveJob(job)} className="text-amber-600">
                        <Archive className="h-4 w-4 mr-2" />
                        Move to Draft
                      </DropdownMenuItem> : <DropdownMenuItem onClick={() => handlePublishJob(job)} className="text-green-600">
                        <Save className="h-4 w-4 mr-2" />
                        Publish Job
                      </DropdownMenuItem>}
                      
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
    </div>
  )
}
