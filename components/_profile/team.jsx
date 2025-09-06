"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {

  Users,

  
  Mail,
  Calendar,
  Search,
 Trash2,
  
  User,
  ArrowRight,
  ArrowLeft,
  
} from "lucide-react"
import { formatDate } from "@/libs/formatDate"
import useAuthStore from "@/stores/useAuthStore"
import TeamsDialog from "./teams-dialog"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"



export default function Team(
    {
        isAddUserOpen,
        setIsAddUserOpen,
        filteredUsers,
        roleConfig,
        roleFilter,
        setRoleFilter,
        setDepartmentFilter,
        roles,
        searchTerm,
        setSearchTerm,
        companyId,
        companyName,
        slug

    }){
 const user = useAuthStore((state) => state.user);
 const[isDeleting, setIsDeleting] = useState(false);
 const [isMigrating, setIsMigrating] = useState(false);
 const userId =user?.id
  const queryClient= useQueryClient()

   

 const handleDeleteUser = async(userId) => {
  try{
    setIsDeleting(true);
  const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete/${slug}/${userId}`,
          { withCredentials: true }
        );
        queryClient.invalidateQueries(['company_profile', slug]);
        toast.success(res.data.message || "User deleted successfully");
      }catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }finally {
        setIsDeleting(false);
      }
 };


 const handleRoleUpdate = async (userId, newRole) => {
   try {
     setIsMigrating(true);
     const res = await axios.patch(
       `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update/${slug}/${userId}`,
       { role: newRole },
       { withCredentials: true }
     );
     queryClient.invalidateQueries(['company_profile', slug]);
     toast.success(res.data.message || "User role updated successfully");
   } catch (error) {
     toast.error(error.response?.data?.message || "Failed to update user role");
   }finally{
    setIsMigrating(false);
   }
 };

  return (
    <div>
         <div className={`space-y-6 ${isDeleting ? "opacity-50" : ""}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Our Team</h2>
            <p className="text-muted-foreground">Meet people responsible for recruiting and onboarding new talent.</p>
          </div>
         {/* member dialog */}
         <TeamsDialog
           isAddUserOpen={isAddUserOpen}
           setIsAddUserOpen={setIsAddUserOpen}
           companyId={companyId}
           slug={slug}
           companyName={companyName}
         />
        </div>

        {/* Filters */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="search">Search Team</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 bg-white"
                  />
                </div>
              </div>

              

              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Team Size</Label>
                <div className="text-2xl font-bold text-blue-600 bg-white rounded-md px-3 py-2 border">
                  {filteredUsers.length} members
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => {
            const roleInfo = roleConfig[user.role ]
            const RoleIcon = roleInfo?.icon || User

            return (
              <Card
                key={user.id}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <Avatar className="w-20 h-20 mx-auto border-4 border-white shadow-lg">
                        <AvatarImage src={user?.company?.logo} alt={user.email} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
                          {user.email
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>   
                              {userId === user.id && (
                          <div className="absolute top-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </Avatar>
            
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <Badge className={`${roleInfo?.color} ${roleInfo?.textColor} capitalize px-3 py-1 shadow-lg`}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {user.role}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center rounded-sm  p-1 bg-gradient-to-r  text-white 
                       from-cyan-500 to-blue-600 justify-center gap-2 ">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${user.email}`} className="hover:text-blue-100 transition-colors">
                          {user.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {formatDate(user.createdAt)}</span>
                      </div>
                    </div>

                   
                      
                    <div className="flex justify-center gap-2 pt-4">
                     {user?.role=== 'recruiter' ? (
                       <Button disabled={isMigrating} variant="outline" onClick={() => handleRoleUpdate(user.id, 'admin')} size="sm"
                        className="text-white hover:ring-blue-700  bg-blue-700 flex items-center gap-1">
                         Recruiter <ArrowRight/> Admin
                       </Button>
                     ):(
                       <Button  disabled={isMigrating} variant="outline" onClick={() => handleRoleUpdate(user.id, 'recruiter')} size="sm" className="text-white bg-amber-500 flex items-center gap-1">
                          Recruiter <ArrowLeft/> Admin
                       </Button>
                     )}

                    <Button disabled={isDeleting} variant="outline" onClick={() => handleDeleteUser(user.id)} className={"bg-red-600 text-white hover:bg-red-700 flex items-center gap-1"} size="sm">
                      <Trash2  />

                    </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No team members found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setDepartmentFilter("all")
                    setRoleFilter("all")
                  }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    
  )
}
