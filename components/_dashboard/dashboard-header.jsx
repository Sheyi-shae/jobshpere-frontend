"use client"

import { Search, Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import useAuthStore from "@/stores/useAuthStore"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const pathName=usePathname()
  const slug = useAuthStore((state) => state.user?.company?.slug);

//  console.log("pathname", pathName)
  return (
    <header className="flex h-16 shrink-0 items-center gap-2  transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 " />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden lg:block">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden lg:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-2 px-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search candidates, jobs..." className="w-[300px] pl-8" />
        </div>
       <Link href={`/${slug}/dashboard/jobs`}>
         <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-900">
           <Plus className="h-4 w-4 mr-2" />
           Post Job
         </Button>
       </Link>
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
