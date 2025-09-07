"use client"
import { Building2, Users, FileText, BarChart3, Settings,  } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from "@/stores/useAuthStore"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import logout from '@/libs/logout'





export function AppSidebar({...props}) {
    const user=useAuthStore((state)=> (state.user))
   

    const userLogout =useAuthStore((state)=>(state.logout))
    const pathName=usePathname()
 
 

const handleLogout=async()=>{
 logout();
 userLogout()


}
const companySlug=user?.company?.slug
const data = {
 
  navMain: [
    {
      title: "Overview",
      url: `/${companySlug}/dashboard`,
      icon: BarChart3,
      
    },
    {
      title: "Job Postings",
      url: `/${companySlug}/dashboard/jobs`,
      icon: FileText,
      items: [
        {
          title: "Active Jobs",
          url:  `/${companySlug}/dashboard/jobs/active-jobs`,
        },
        {
          title: "Draft Jobs",
          url: `/${companySlug}/dashboard/jobs/draft-jobs`,
        },
      
      ],
    },
    {
      title: "Candidates",
      url: `/${companySlug}/dashboard/candidates`,
      icon: Users,
      items: [
        {
          title: "Applications",
          url: `/${companySlug}/dashboard/candidates/applications`,
        },
        {
          title: "Shortlisted",
          url: `/${companySlug}/dashboard/candidates/shortlisted`,
        },
        {
          title: "Screened Out",
          url: `/${companySlug}/dashboard/candidates/screened-out`,
        },
       
      ],
    },
   
    {
      title: "Company Profile",
      url: `/${companySlug}/dashboard/company-profile`,
      icon: Building2,
      items: [

      {
          title: "Subscription",
          url: `/${companySlug}/dashboard/company-profile/subscription`,
        },
      ]
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}
  
  return (
    <Sidebar variant="inset" {...props} >
      <SidebarHeader>
        <div className="flex items-center gap-3 px-3 py-2 ">
          <div className="relative w-16 h-14">
          {/* Briefcase body */}
          <div className="absolute inset-x-2 top-4 bottom-2 bg-blue-900 rounded-lg shadow-lg">
            {/* Briefcase handle */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-2 border-2 border-blue-900 rounded-t-lg bg-transparent"></div>

            {/* Briefcase lock */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>

            {/* Briefcase divider line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-800"></div>
          </div>

        </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground">JobSphere</span>
            <span className="text-xs capitalize text-sidebar-foreground/70">{user?.company?.name}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem  key={item.title}>
                  <SidebarMenuButton asChild 
                  className={`${pathName===item.url ? 'bg-amber-500 text-slate-900 hover:bg-amber-600' : ''}`}>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.items && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className={`${pathName===subItem.url ? 'bg-amber-500 text-slate-900 hover:bg-amber-600' : ''}`}>
                            <Link href={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.company.logo} alt={user?.company.name} />
                    <AvatarFallback className="rounded-lg bg-amber-500 text-slate-900">
                      {user?.company?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.email}</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">{user?.company.name}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.company.logo } alt={user?.company.name} />
                      <AvatarFallback className="rounded-lg bg-amber-500 text-slate-900">
                        {user?.company.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.email}</span>
                      <span className="truncate text-xs text-muted-foreground">{user?.company.name}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
