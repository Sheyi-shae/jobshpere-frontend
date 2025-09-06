"use client"
import { useCallback, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import { Camera, Upload, UploadCloud } from "lucide-react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export default function CompanyHeader({ companyData }) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
    const queryClient = useQueryClient()
  

  const handleFiles = useCallback(
    async (fileList) => {
      const validFile = Array.from(fileList).find((file) => {
        const validTypes = ["image/jpeg", "image/png", "image/gif"]
        return validTypes.includes(file.type)
      })

      if (!validFile) {
        toast.error("Invalid file type")
        return
      }

      if (validFile.size > 10 * 1024 * 1024) {
        toast.error("File must be under 10MB")
        return
      }

      setUploading(true)
      setUploadProgress(0)

      const formData = new FormData()
      formData.append("file", validFile)

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/${companyData.slug}/company`,
          formData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (e) => {
              if (e.total) {
                const percent = Math.round((e.loaded * 100) / e.total)
                setUploadProgress(percent)
              }
            },
          }
        )

        const logo = response.data?.url ?? null
        if (!logo) throw new Error("No logo URL returned from server")

        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${companyData.slug}`,
          { logo },
          { withCredentials: true }
        )

        queryClient.invalidateQueries(['company_profile', companyData.slug])
        toast.success("Logo uploaded successfully")
        setUploadProgress(0) 
      } catch (err) {
        console.error(err)
        toast.error("Upload failed. Please try again.")
      } finally {
        setUploading(false)
        setUploadProgress(0)
        fileInputRef.current.value = ""
      }
    },
    [companyData]
  )

  const handleChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles]
  )

  return (
    <div className="relative">
      <div className="h-48 bg-gradient-to-r from-blue-900 via-amber-500 to-blue-900 rounded-xl"></div>

      <div className="absolute -bottom-16 left-8">
        <div className="relative">
          {uploading && (
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-blue-700 bg-opacity-50 flex items-center justify-center rounded-full z-10">
              <div className="text-white text-sm"><UploadCloud className="animate-pulse"/></div>
            </div>
          )}
          <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
            <AvatarImage src={companyData.logo || ""} alt={companyData.name} />
            <AvatarFallback className="bg-gradient-to-br uppercase from-blue-500 to-purple-600 text-white text-3xl font-bold">
              {companyData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="z-10 absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white hover:bg-gray-50 text-gray-600 shadow-lg"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={handleChange}
              className="hidden"
            />
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
