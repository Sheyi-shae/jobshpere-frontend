import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,

  
} from "lucide-react"

import NewUserForm from "../_auth/create-user"
import { Button } from "../ui/button"

export default function TeamsDialog(
    {
        isAddUserOpen,
        setIsAddUserOpen,
        companyId,
        slug,
        companyName
    }
) {
  return (
     <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Team Member</DialogTitle>
                <DialogDescription>Fill in the details to add a new team member to your company.</DialogDescription>
              </DialogHeader>
              <div>
                <NewUserForm companyId={companyId} slug={slug} companyName={companyName} setIsAddUserOpen={setIsAddUserOpen} />
              </div>
              
            </DialogContent>
          </Dialog>
  )
}
