"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Briefcase, TrendingUp, Users, Star } from "lucide-react"
 import { motion, AnimatePresence } from "framer-motion";
import Logo from '../logo'



const heroStats = [
  { icon: Briefcase, label: "Active Jobs", value: "1,247", color: "text-blue-600" },
  { icon: Users, label: "Companies", value: "350+", color: "text-green-600" },
  { icon: TrendingUp, label: "Success Rate", value: "94%", color: "text-purple-600" },
  { icon: Star, label: "User Rating", value: "4.9", color: "text-amber-600" },
]

const floatingElements = [
  { icon: "💼", delay: 0, duration: 3 },
  { icon: "🚀", delay: 1, duration: 4 },
  { icon: "⭐", delay: 2, duration: 3.5 },
  { icon: "💡", delay: 0.5, duration: 4.5 },
  { icon: "🎯", delay: 1.5, duration: 3.8 },
]
export default function HeroSection({ onSearch }) {
     const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [positions, setPositions] = useState([]);
  const [currentText, setCurrentText] = useState(0)

  const heroTexts = ["Find Your Dream Job", "Build Your Career", "Join Amazing Teams", "Shape Your Future"]

  

useEffect(() => {
  const generated = floatingElements.map(() => ({
    left: `${Math.random() * 80 + 10}%`,
    top: `${Math.random() * 60 + 20}%`,
  }));
  setPositions(generated);
}, []);

  useEffect (() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    onSearch(searchTerm, location)
  }
  return (
      <div className="relative min-h-[80vh] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* logo here */}
        {/* <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
               <Logo/>
        </div> */}
        
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

           {/* Floating Elements */}
     {positions.length > 0 && floatingElements.map((element, index) => (
  <div
    key={index}
    className="absolute text-4xl opacity-20 animate-bounce"
    style={{
      ...positions[index],
      animationDelay: `${element.delay}s`,
      animationDuration: `${element.duration}s`,
    }}
  >
    {element.icon}
  </div>
))}


        <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Animated Title */}
          <div className="space-y-4">
           

        
<AnimatePresence mode="wait">
  <motion.span
    key={heroTexts[currentText]}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-r text-5xl md:text-7xl font-bold  from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-transparent"
  >
{heroTexts[currentText]}
  </motion.span>
</AnimatePresence>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of opportunities from top companies worldwide. Your next career move starts here.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-white/90 border-0 text-slate-900 placeholder:text-slate-500"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    placeholder="City, state, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 h-12 bg-white/90 border-0 text-slate-900 placeholder:text-slate-500"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
            {heroStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-2">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


        {/* Wave Animation */}
      <div className="absolute bottom-0 left-0 right-0">
  <svg className="w-full h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
    <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z">
      <animate
        attributeName="d"
        dur="6s"
        repeatCount="indefinite"
        values="
          M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z;
          M0,50 C300,20 900,100 1200,50 L1200,120 L0,120 Z;
          M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z
        "
      />
    </path>
  </svg>
</div>

      </div>
  )
}
