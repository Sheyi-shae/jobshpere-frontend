"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  Star,
  Users,
  Building2,
} from "lucide-react"
import Logo from "../logo"

const footerSections = [
  {
    title: "For Job Seekers",
    links: [
      { name: "Browse Jobs", href: "/jobs" },
      { name: "Company Reviews", href: "#" },
      { name: "Salary Guide", href: "#" },
      { name: "AI Resume Review", href: "/resume-analysis" },
      { name: "Career Advice", href: "#" },
    
    ],
  },
  {
    title: "For Employers",
    links: [
      { name: "Post a Job", href: "/join" },
      { name: "Browse Resumes", href: "#" },
      { name: "Employer Branding", href: "#" },
      { name: "Recruitment Solutions", href: "#" },
      { name: "Pricing", href: "/join" },
      
    ],
  },

  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partnerships", href: "/partners" },
      { name: "Contact", href: "/contact" },
      { name: "Investor Relations", href: "/investors" },
    ],
  },
]

const stats = [
  { icon: Users, label: "Active Users", value: "2M+" },
  { icon: Building2, label: "Companies", value: "50K+" },
  { icon: Briefcase, label: "Jobs Posted", value: "500K+" },
  { icon: Star, label: "Success Rate", value: "94%" },
]

export function VisitorFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Stats Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with JobSphere</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the latest job opportunities, career tips, and industry insights delivered to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-amber-500"
              />
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo/>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The modern platform connecting top talent with leading companies. Discover opportunities, build your
              career, and achieve your professional goals with JobSphere.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>hello@jobsphere.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>+2348148299505</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span> CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>© 2024 JobSphere. All rights reserved.</span>
              <div className="flex items-center gap-4">
                <a href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
                <a href="/cookies" className="hover:text-amber-400 transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
