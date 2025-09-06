"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Edit, Plus} from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useQueryClient } from "@tanstack/react-query"

export default function DescriptionDialog({slug, FetchedDescription, FetchedWebsite}) {
    const [description, setDescription] = useState(FetchedDescription || "")
    const [website, setWebsite] = useState(FetchedWebsite || "")
    const [isDescriptionDialogOpen, setDescriptionDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const queryClient = useQueryClient()

    //website url checker
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\\.)+[a-z]{2,}|'+ // domain name
    'localhost|\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|'+ // IP address
    '\\[?[a-f0-9]*:[a-f0-9:%.~+\\-]*\\]?)'+ // IPv6
    '(\\:\\d+)?(\\/[^\\s]*)?$','i');
    const isValidUrl = urlPattern.test(website);

    const handleDescriptionUpdate =async(e)=>{
        e.preventDefault()
        if(website && !isValidUrl){
            toast.error("Please enter a valid website URL")
        }
        if (description && description.length < 20) {
            toast.error("Website Description must be more than 20 characters")
        }
        try {
            setIsLoading(true)
            // Simulate an API call
            const res= await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${slug}`,
                {description, website},
                {withCredentials:true} )
                 queryClient.invalidateQueries(['company_profile', slug]);
                 setDescriptionDialogOpen(false)
                toast.success(res.data.message)
        
       
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong")  
        }finally{
            setIsLoading(false)
        }

    }
  return (
     <Dialog open={isDescriptionDialogOpen} onOpenChange={setDescriptionDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setDescriptionDialogOpen(true)} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Company Details</DialogTitle>
                <DialogDescription>Fill in the details to edit the company details.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">

                <div className="grid gap-2">
                  <Label htmlFor="website" className="font-medium">Website</Label>
                  <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website URL"
                /></div>

                <div className="grid gap-2">
                <Label htmlFor="description" className="font-medium">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Type your description here."
                  className="min-h-[150px]"
                />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" onClick={() => setDescriptionDialogOpen(!isDescriptionDialogOpen)} variant="outline">
                  Cancel
                </Button>
                <Button disabled={isLoading || !description && !website} onClick={handleDescriptionUpdate} type="submit" className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-amber-600 hover:to-blue-700 text-white">
                  Save
                </Button>

              </DialogFooter>
            </DialogContent>
          </Dialog>
  )
}
