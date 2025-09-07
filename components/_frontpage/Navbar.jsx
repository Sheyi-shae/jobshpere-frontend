"use client"


import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
 
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Briefcase, Search, Menu, X, Building2, TrendingUp, BookOpen, ChevronDown, Globe, MapPin } from "lucide-react"
import Logo from "../logo"
import Link from "next/link"

const navigationItems = [
  {
    title: "Find Jobs",
    href: "/jobs",
    description: "Browse thousands of job opportunities",
    icon: Briefcase,
    items: [
      { title: "All Jobs", href: "/jobs", description: "Browse all available positions" },
      { title: "Remote Jobs", href: "/jobs?remote", description: "Work from anywhere opportunities" },
      { title: "Contract Jobs", href: "/jobs?contract", description: "Temporary positions" },
      { title: "Internships", href: "/jobs?internship", description: "Entry-level opportunities" },
    ],
  },
  {
    title: "Companies",
    href: "/companies",
    description: "Discover amazing companies",
    icon: Building2,
    items: [
      { title: "Browse Companies", href: "#", description: "Explore company profiles" },
      { title: "Top Employers", href: "#", description: "Industry-leading companies" },
      
    ],
  },
  {
    title: "Career Tools",
    href: "/tools",
    description: "Tools to boost your career",
    icon: TrendingUp,
    items: [
    
      { title: "Resume Review", href: "/resume-analysis", description: "AI-powered resume analysis" },
     
      { title: "Salary Calculator", href: "/tools/salary", description: "Know your market value" },
    ],
  },
 
]


export function VisitorNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
    //  console.log("Searching for:", searchQuery)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/50 backdrop-blur-lg shadow-lg border-b border-gray-200" : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className=" bg-gradient-to-r rounded-sm from-slate-700 to-blue-900"
          > <Logo/></div>
         

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="text-gray-700 hover:text-blue-600 font-medium">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-80 p-4">
                        <div className="mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <div className="space-y-2">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.title}
                              href={subItem.href}
                              className="block p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                            >
                              <div className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                                {subItem.title}
                              </div>
                              <div className="text-sm text-gray-600">{subItem.description}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

        

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
           <Link href={'/join'}>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6">
              Hire Talent
            </Button>
            </Link>
          
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Search */}
              <div className="md:hidden">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </form>
              </div>

              {/* Mobile Navigation */}
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </div>
                    <div className="pl-6 space-y-2">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.title}
                          href={subItem.href}
                          className="block text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {subItem.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                
               <Link href={'/join'}> <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  Hire Talent
                </Button></Link>
              </div>

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Language</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        🇺🇸 EN <ChevronDown className="w-3 h-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>🇺🇸 English</DropdownMenuItem>
                      <DropdownMenuItem>🇪🇸 Español</DropdownMenuItem>
                      <DropdownMenuItem>🇫🇷 Français</DropdownMenuItem>
                      <DropdownMenuItem>🇩🇪 Deutsch</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar for Page Loading */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 transition-transform duration-300"></div>
    </nav>
  )
}
