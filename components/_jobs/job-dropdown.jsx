import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Star,

  Mail,

  MessageSquare,
  CheckCircle,
  XCircle,
  
  ExternalLink,

} from "lucide-react"
import {Button} from "@/components/ui/button"

export default function JobDropdown({updateApplicationStatus, application}) {
  return (
     <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                           {application.status !== "shortlisted" &&
                           (
                           <><DropdownMenuItem onClick={() => updateApplicationStatus(application.id, "shortlisted")}>
                              <Star className="h-4 w-4 mr-2 text-amber-500" />
                              Shortlist
                            </DropdownMenuItem></>)} 
                            
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2 text-blue-500" />
                              Send Email
                            </DropdownMenuItem>
                           
                            <DropdownMenuSeparator />
                           
                           {application.status !== "screened_out" && 
                           (
                           <><DropdownMenuSeparator />
                           <DropdownMenuItem
                              onClick={() => updateApplicationStatus(application.id, "screened_out")}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject Application
                            </DropdownMenuItem></>)}
                          </DropdownMenuContent>
                        </DropdownMenu>
  )
}
