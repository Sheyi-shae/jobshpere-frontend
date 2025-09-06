"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, X } from "lucide-react"
import { formatCurrency } from "@/libs/currencyFormat"



export function JobFilters({
  searchTerm,
  location,
  jobType,
  salaryRange,
  onSearchChange,
  onLocationChange,
  onJobTypeChange,
  onSalaryRangeChange,
  onClearFilters,
  resultCount,
}) {
  const activeFilters = [
    searchTerm && { label: `Search: ${searchTerm}`, clear: () => onSearchChange("") },
    location && { label: `Location: ${location}`, clear: () => onLocationChange("") },
    jobType && jobType !== "all" && { label: `Type: ${jobType}`, clear: () => onJobTypeChange("all") },
    salaryRange &&
      salaryRange !== "all" && { label: `Salary: ${salaryRange}`, clear: () => onSalaryRangeChange("all") },
  ].filter(Boolean)

  return (
    <Card className="bg-gradient-to-r from-white to-blue-50 border-blue-100">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Search and Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Jobs</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Job title, keywords, or company"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="location"
                  placeholder="City, state, or remote"
                  value={location}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select value={jobType} onValueChange={onJobTypeChange}>
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Salary Range</Label>
              <Select value={salaryRange} onValueChange={onSalaryRangeChange}>
                <SelectTrigger className="bg-white w-full">
                  <SelectValue placeholder="All Salaries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Salaries</SelectItem>
                  <SelectItem value="0-50000">{formatCurrency(0)} - {formatCurrency(50000)}</SelectItem>
                  <SelectItem value="50000-100000">{formatCurrency(50000)} - {formatCurrency(100000)}</SelectItem>
                  <SelectItem value="100000-150000">{formatCurrency(100000)} - {formatCurrency(150000)}</SelectItem>
                  <SelectItem value="150000+">{formatCurrency(150000)}+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Results</Label>
              <div className="flex items-center justify-between h-10 px-3 bg-white border rounded-md">
                <span className="text-sm font-medium text-blue-600">{resultCount} jobs found</span>
                {activeFilters.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                  onClick={filter.clear}
                >
                  {filter.label}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
