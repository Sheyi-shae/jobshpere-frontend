'use client'
import axios from 'axios';
import { Form, } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod";
import { toast } from 'sonner';
import { PlainTextInput } from '../_reusable/form-input';
import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, File, FileText, X, Eye, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMutation, useQueryClient } from '@tanstack/react-query';




const formSchema = z.object({
    fullName: z.string("Full name is required").min(6, "Please enter your full name"),
    email: z.email(),
    
    resumeUrl: z.string("Please provide a valid URL for your resume"),

});
export default function ApplicationForm({jobId,onClose,companyId}) {
 const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)
  const queryClient = useQueryClient();



 const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
           
           
        },
    });

 const handleFiles = useCallback(
  async (fileList) => {
    const validFile = Array.from(fileList).find((file) => {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(percent)
        },
      })
     // console.log("File uploaded successfully:", response.data)
      toast.success("File uploaded successfully")

      const resumeUrl = response.data.url
       // ← your backend should return this
      setFile({
        file: validFile,
        preview: validFile.type === "application/pdf" ? URL.createObjectURL(validFile) : null,
        url: resumeUrl,
      })

      form.setValue("resumeUrl", resumeUrl)
    } catch (err) {
      toast.error("Upload failed. Please try again.")
      console.error(err)
    } finally {
      setUploading(false)
    }
  },
  [form]
)


 const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFiles(e.dataTransfer.files)
      }
    },
    [handleFiles],
  )
 const handleChange = useCallback(
    (e) => {
      e.preventDefault()
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles],
  )

  const removeFile = useCallback(() => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
  }, [file])

    

     const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (type) => {
    if (type === "application/pdf") return <FileText className="w-5 h-5 text-red-500" />
    return <File className="w-5 h-5 text-blue-900" />
  }

  const submitApplication = async (data) => {
    const applicationData = {
      ...data,jobId,companyId}
  const response = await axios.post(
   `${process.env.NEXT_PUBLIC_BACKEND_URL}/application/apply`, applicationData );
  return response.data;
  
};
  //use mutation to handle the form submission
  const mutation = useMutation({
  mutationFn: submitApplication,
  onSuccess: (data) => {
    toast.success(data.message);
    form.reset();
    //close the modal  
    onClose();
    //invalidate the queries
  Promise.allSettled([
      queryClient.invalidateQueries(['jobs', '']),
      queryClient.invalidateQueries(['applications'])
    ]);
    
    form.reset();
   
  },
  onError: (error) => {
  const message = error?.response?.data?.message ;
  toast.error(message);
}

})

    async function onSubmit(data) {
  if (!file || !file.url) {
    toast.error("Please upload a resume before submitting.");
    return;
  }

  
  mutation.mutate(data);
}

  return (
    <>
      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          

                            <PlainTextInput
                                form={form}
                                name="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                label="Full Name" />

                            <PlainTextInput
                                form={form}
                                name="email"
                                placeholder="Enter your email address"
                                label="Email" />

                            {/* resume upload */}
                             <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-lg md:text-2xl font-semibold tracking-tight">Upload Resume</h2>
        <p className="text-muted-foreground">Upload PDF or Word documents with drag & drop or click to browse</p>
      </div>

      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-200 hover:border-primary/50",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
        )}
      >
        <CardContent className="p-8">
          <div
            className="text-center space-y-4 cursor-pointer"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {dragActive ? "Drop file here" : file ? "Replace document" : "Choose file or drag and drop"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {file ? "Drop a new file to replace the current one" : "PDF, DOC, DOCX up to 10MB"}
              </p>
            </div>
            <Button variant="outline" className="mt-4 bg-transparent">
              Browse Files
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleChange}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploading && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading files...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Single File Preview */}
      {file && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uploaded Document</h3>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                {/* File Info */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getFileIcon(file.file.type)}
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold text-base leading-none">{file.file.name}</p>
                        <div className="flex items-center space-x-3">
                          <Badge variant="secondary" className="text-sm">
                            {file.file.type === "application/pdf" ? "PDF Document" : "Word Document"}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{formatFileSize(file.file.size)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.preview && (
                        <Button variant="ghost" size="sm" onClick={() => window.open(file.preview, "_blank")}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const url = URL.createObjectURL(file.file)
                          const a = document.createElement("a")
                          a.href = url
                          a.download = file.file.name
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={removeFile}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* PDF Preview */}
                {/* {file.preview && file.file.type === "application/pdf" && (
                  <div className="w-64 border-l bg-muted/30">
                    <div className="h-40 p-3">
                      <iframe
                        src={`${file.preview}#toolbar=0&navpanes=0&scrollbar=0`}
                        className="w-full h-full rounded border bg-white"
                        title={`Preview of ${file.file.name}`}
                      />
                    </div>
                  </div>
                )} */}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      
    </div>

                    <Button
  type="submit"
  disabled={uploading || mutation.isPending}
  className="w-full bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 hover:from-blue-600 hover:to-indigo-600 text-white 
  transition-all duration-300 transform hover:scale-105"
>
  {uploading ? ("Uploading...") : mutation.isPending ? ("Submitting...") : ("Submit Application")}
</Button>
  

                        </form>
                    </Form>
    </>
  )
}
