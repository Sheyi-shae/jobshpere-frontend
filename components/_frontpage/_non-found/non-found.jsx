"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, Search, ArrowLeft,  Mail, Phone } from "lucide-react"
import { useState } from "react"



const popularSearches = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UX Designer",
  "Marketing Manager",
  "Sales Representative",
]

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search logic here
      window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleQuickSearch = (query) => {
    window.location.href = `/jobs?q=${encodeURIComponent(query)}`
  }

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/15 to-pink-200/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
         

         
           
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The page you're looking for seems to have taken a different career path. Let's help you find what you're
              actually searching for.
            </p>
        
        </div>

        {/* Search Section */}
        <Card className="max-w-2xl mx-auto mb-16 border-0 shadow-xl bg-white/80 backdrop-blur-sm animate-slide-up">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Search for Jobs Instead</h2>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for jobs, companies, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Search Jobs
              </Button>
            </form>

            {/* Popular searches */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleQuickSearch(search)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-blue-100 hover:text-blue-700 rounded-full transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

       

        

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="flex items-center gap-2 px-8 py-3 border-gray-300 hover:border-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            size="lg"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Button>
        </div>

        {/* Help Section */}
        <Card className="max-w-2xl mx-auto border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Still Need Help?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to help you navigate your career journey.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Mail className="w-4 h-4" />
                Contact Support
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Phone className="w-4 h-4" />
                Call Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

     
    </div>
  )
}
