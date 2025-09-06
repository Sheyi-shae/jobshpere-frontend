"use client"

import AuthCheck from "@/_providers/AuthCheck";
import { AppSidebar } from "@/components/_dashboard/app-sidebar";
import { DashboardHeader } from "@/components/_dashboard/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Poppins } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});



export default function Layout({ children }) {
  
  return (
    
      <main className={`${poppins.variable} antialiased`}>
        <AuthCheck>
        <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="space-y-6">
            

            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
       </AuthCheck>
           
        
      </main>
    
  );
}
