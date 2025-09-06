"use client"

import {  useState } from "react"
import {
  Crown,
  Briefcase,
 
} from "lucide-react"

import CompanyHeader from "./company-header"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "next/navigation"

import CompanyInfo from "./company-info"
import Team from "./team"
import { CompanyProfileSkeleton } from "../_skeleton/company-profile-skeleton"





const roleConfig = {
  admin: {
    color: "bg-gradient-to-r from-amber-500 to-cyan-700",
    textColor: "text-white",
    icon: Crown,
  },
  recruiter: {
    color: "bg-gradient-to-r from-blue-600 to-amber-500",
    textColor: "text-white",
    icon: Briefcase,
  },

 
}



export function CompanyProfileDisplay() {
  
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const params = useParams();
  const { slug } = params;

 

//fetch company data from backend using react query 
const {
      data,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['company_profile',slug],
      queryFn: async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${slug}`,
          { withCredentials: true }
        );
        return res.data.data;
      },
      
      
      //staleTime: 5 * 60 * 1000, 
      retry: false 
    });

    const users =data?.users || [];
// roles for filters

  const roles = [...new Set(users.map((user) => user.role))]


  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
   
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch  && matchesRole
  })
    
  
  if (isLoading) {
      return <CompanyProfileSkeleton/>;
    }
  return (
    <div className="space-y-8">
      {/* Company Header */}
     {data && <CompanyHeader companyData={data}/>}
      {/* Company Info */}
     <CompanyInfo  data={data}/>
      {/* Team Section */}
      <Team
        isAddUserOpen={isAddUserOpen}
        setIsAddUserOpen={setIsAddUserOpen}
       // newUser={newUser}
       // setNewUser={setNewUser}
       // handleAddUser={handleAddUser}
       // handleRemoveUser={handleRemoveUser}
        filteredUsers={filteredUsers}
      //  departments={departments}
        roleConfig={roleConfig}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
       
        roles={roles}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        companyId={data.id}
        companyName={data.name}
        slug={data.slug}
      />
     </div>
  )
}
