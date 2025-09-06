"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2 } from "lucide-react"
import ApplicationForm from "./application-form"



export function JobApplicationModal({ job, isOpen, onClose }) {
 




  if (!job) return null

 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full md:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={job?.company?.logo || "/placeholder.svg"} alt={job?.company?.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {job?.company?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-base font-bold">{job?.title}</div>
              <div className="text-sm text-muted-foreground font-normal flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {job?.company?.name}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for this position. All fields are required.
          </DialogDescription>
        </DialogHeader>

       <ApplicationForm jobId={job.id} onClose={onClose} companyId={job.company.id} />
      </DialogContent>
    </Dialog>
  )
}
