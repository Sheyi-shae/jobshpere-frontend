"use client"



import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, FileText, Sparkles, CheckCircle, AlertCircle, X } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"
import { aiMockResult } from "@/libs/aiMockresults"
import { Progress } from "../ui/progress"



export function ResumeReview() {
  const [jobDescription, setJobDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
   const [uploadProgress, setUploadProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null || {})

  const handleFiles = useCallback(
   async (fileList) => {
     const validFile = Array.from(fileList).find((file) => {
       const validTypes = [
         "application/pdf",
         "application/msword",
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
           
         ,
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
       toast.success("Resume uploaded successfully")
 
       const resumeUrl = response.data.url
        // ← your backend should return this
       setSelectedFile({
         file: validFile,
         preview: validFile.type === "application/pdf" ? URL.createObjectURL(validFile) : null,
         url: resumeUrl,
       })
     } catch (err) {
       toast.error("Upload failed. Please try again.")
       console.error(err)
     } finally {
       setUploading(false)
     }
   },
   []
 )
 

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    }
  }
   const handleChange = useCallback(
    (e) => {
      e.preventDefault()
      if (e.target.files && e.target.files[0]) {
        handleFiles(e.target.files)
      }
    },
    [handleFiles],
  )

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !selectedFile) return

    setIsAnalyzing(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/application/public/score`, {
        jobDescription,
        resumeUrl: selectedFile.url,
      })
      
     const mockResult=aiMockResult(response.data.data)
      if(response.data.success){
      setAnalysisResult(mockResult)
    setIsAnalyzing(false)
    setShowResults(true)}
   
    } catch (error) {
      toast.error(error?.response?.data?.message || "Analysis failed. Please try again.")
    }finally{
      setIsAnalyzing(false)
    }
  }

  const removeSelectedFile = () => {
    setSelectedFile(null)
    
  }

  return (
    <div className="container mx-auto px-4  py-8 max-w-5xl shadow-sm">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Resume Review & Analysis</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Get AI-powered insights to optimize your resume for any job opportunity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Description Input */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Job Description
            </CardTitle>
            <CardDescription>Paste the job description you're applying for</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="job-description" className="sr-only">
              Job Description
            </Label>
            <Textarea
              id="job-description"
              placeholder="Paste the complete job description here. Include requirements, responsibilities, and preferred qualifications..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className={`min-h-[200px] max-h-[400px] resize-none ${jobDescription.length > 0 ? "bg-blue-50" : "bg-input"} border-border focus:ring-ring`}
            />
          </CardContent>
        </Card>

        {/* Resume Upload */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2"> <Upload className="h-5 w-5 text-primary" />
              Resume Upload </div>
             
               {selectedFile &&
                <button className="hover:cursor-pointer bg-red-500 rounded-full" onClick={removeSelectedFile}><X className="text-white"/></button>}
            </CardTitle>
            <CardDescription>Upload your resume in PDF/DOCX format</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-card"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2 bg-blue-50">
                  <FileText className="h-12 w-12 text-primary" />
                  <p className="font-medium text-foreground">{selectedFile.file.name}</p>
                  <p className="text-sm text-muted-foreground">{(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <p className="font-medium text-foreground">Drop your resume here</p>
                  <p className="text-sm text-muted-foreground">or click to browse files</p>
                  <p className="text-xs text-muted-foreground">DOCX/PDF files only</p>
                </div>
              )}
            </div>
            <input 
            id="file-upload"
             type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleChange} className="hidden" />
              {/* Upload Progress */}
      {uploading && (
        
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading files...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
        
      )}
          </CardContent>
        </Card>
      </div>
      

      {/* Analyze Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleAnalyze}
          disabled={!jobDescription.trim() || !selectedFile || isAnalyzing}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600/75 text-primary-foreground px-8"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Analyzing Resume...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4 " />
              Analyze Resume
            </>
          )}
        </Button>
      </div>

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="w-lg md:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Resume Analysis Results
            </DialogTitle>
            <DialogDescription>Here's your comprehensive resume analysis and recommendations</DialogDescription>
          </DialogHeader>

          {analysisResult && (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{analysisResult?.score}/100</div>
                    <p className="text-muted-foreground">Overall Match Score</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-4">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analysisResult?.score}%` }}
                      />
                    </div>
                      <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-semibold">{analysisResult?.summary}</span>
                  </div>
                  </div>
                </CardContent>
              </Card>

              

              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult?.strengths?.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult?.improvements?.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                 
                      <li  className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{analysisResult?.recommendation}</span>
                      </li>
                  
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
