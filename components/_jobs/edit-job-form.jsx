"use client"


import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Tag,
  FileText,
  Eye,
  Save,
  Plus,
  X,
  Briefcase,
  Users,
  LoaderPinwheel,
  
} from "lucide-react"
import  { PlainTextInput, SelectForm, TextAreaInput } from "../_reusable/form-input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Form,} from "@/components/ui/form";
import { BlueButton } from "../_reusable/amber-button"
import { useMutation, useQuery } from "@tanstack/react-query"
import useAuthStore from "@/stores/useAuthStore"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import JobFormSkeleton from "../_skeleton/job-form-skeleton"

const JOB_TYPES = [
  { value: "remote", label: "Remote", icon: Clock },
  { value: "hrybrid", label: "Hybrid", icon: Clock },
  { value: "onsite", label: "Onsite", icon: FileText },
  { value: "contract", label: "Contract", icon: Users },
  { value: "internship", label: "Internship", icon: Users },
  
]

const POPULAR_TAGS = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "GraphQL",
]



  
export default function EditJobPost({jobSlug}) {
    const user=useAuthStore((state)=> (state.user))
  const slug=user?.company?.slug
  
  const [currentTag, setCurrentTag] = useState("")
  const [tags, setTags] = useState([]);
  const [isActive,setIsActive]=useState(true)

  const [isPreview, setIsPreview] = useState(false)

    //fetch job details using jobSlug
     const {
      data,
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ['private-details', jobSlug],
      queryFn: async () => {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${slug}/${jobSlug}/job-details`,
          {withCredentials:true} );
          // console.log(res.data)
        return res.data.data;
       
      },
      
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to fetch job details");
      //  console.log("Error fetching job details:", error);

      },
      staleTime: 5 * 60 * 1000, // Optional: cache user for 5 mins
      retry: false // Don’t retry if unauthorized
    });
  
    const job = data || {}


  
 const router = useRouter()
 const formSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    description: z.string().min(1, "Job description is required"),
    location: z.string().optional(),   
tags: z.array(z.string()).optional(),
salaryMin: z.string().optional(),
salaryMax: z.string().optional(),
type: z.string(),

    
  });
  

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    description: "",
    location: "",
    type: "",
    tags: [],
    salaryMin: "",
    salaryMax: "",
    },
  });

  useEffect(() => {
  if (job?.title) {
    form.reset({
      title: job.title,
      description: job.description || "",
      location: job.location || "",
      type: job?.type || "",
      tags: job.tags || [],
      salaryMin: job.salaryMin || "",
      salaryMax: job.salaryMax || "",
    });
    setTags(job.tags || []); 
  }
}, [job, form]);



 const addTag = (tag) => {
  const trimmed = tag.trim();
  if (trimmed && !tags.includes(trimmed)) {
    setTags([...tags, trimmed]);
    const newTags = [...tags, trimmed];
    form.setValue("tags", newTags);
    setCurrentTag("");
  }
};

const removeTag = (tagToRemove) => {
  setTags(tags.filter((tag) => tag !== tagToRemove));
  const newTags = tags.filter((tag) => tag !== tagToRemove);
  form.setValue("tags", newTags);
};



//update job handler
const updateJob = async (data) => {
  const response = await axios.put(
   `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/${slug}/update-job/${jobSlug}`, data, { withCredentials: true });
  return response.data;
  
};

// Use useMutation to handle the registration
const mutation = useMutation({
  mutationFn: updateJob,
  onSuccess: (data) => {
    toast.success(data.message);
    form.reset();
    router.push(`/${slug}/dashboard/jobs/active-jobs`); 
  },
  onError: (error) => {
  const message = error?.response?.data?.message || "failed to post job";
  toast.error(message);
}

})

   async function onSubmit(data) {
    const jobData= {isActive,
      ...data}
      
    mutation.mutate(jobData);
   // console.log(data)
    
  }
const liveData = form.watch();
if(isError)return null
if(isLoading)return <JobFormSkeleton/>
  if (isPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <Button variant="outline" onClick={() => setIsPreview(false)} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Back to Edit
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <Button className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Publish Job
                </Button>
              </div>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r py-4 -mt-6 from-slate-800 to-blue-950 text-white rounded-t-lg">
                <CardTitle className="text-2xl">{liveData.title || "Job Title"}</CardTitle>
                <div className="flex items-center gap-4 text-blue-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {liveData.location || "Location"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {JOB_TYPES.find((t) => t.value === liveData.type)?.label || "Job Type"}
                  </div>
                  {(liveData.salaryMin || liveData.salaryMax) && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {liveData.salaryMin && liveData.salaryMax
                        ? `${liveData.salaryMin} - ${liveData.salaryMax}`
                        : liveData.salaryMin || liveData.salaryMax}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap mb-6">
                    {liveData.description || "Job description will appear here..."}
                  </p>

                  {liveData.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {liveData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
                
              <h1 className="text-3xl font-bold text-emerald-800">{job.title}</h1>
              <p className="text-gray-600 mt-1">Edit job details below</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsPreview(true)} className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
            <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          
            {/* Basic Information */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r py-4 -mt-6 from-slate-300 to-blue-400 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Basic Information
                </CardTitle>
                <CardDescription>Start with the essential details about your job opening</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <PlainTextInput
                     form={form}
                     label={'Job Title'}
                     name={'title'}
                     placeholder={'senior software dev'}
                     type={'text'}/>
                  </div>
                <div className="grid md:flex gap-4 md:col-span-2 w-full">
                <div className="flex-1">
                    <PlainTextInput
                    form={form}
                    label={
                        <>
                        <MapPin size={18} className="inline mr-1" />
                        Location
                        </>
                    }
                    name={'location'}
                    placeholder={'Lagos'}
                    type={'text'}
                    />
                </div>
                <div className=" mt-1 flex-1">
                    <SelectForm
                    form={form}
                    label={'Job Type'}
                    name={'type'}
                    placeholder={"Select job type"}
                    options={JOB_TYPES}
                    />
                </div>
                </div>

                </div>

                
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r py-4 -mt-6 from-slate-300 to-amber-400 rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <FileText className="h-5 w-5 text-green-600" />
                  Job Description
                </CardTitle>
                <CardDescription>
                  Describe the role, responsibilities, and what makes this opportunity special
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <TextAreaInput
                form={form}
                label={'Description'}
                name={'description'}
                placeholder={'Tell candidates about the role, your company culture, responsibilities, and what you are looking for...'}
                />
              </CardContent>
            </Card>

            {/* Compensation & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Compensation */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r py-4 -mt-6 from-yellow-50 to-orange-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                    Compensation
                  </CardTitle>
                  <CardDescription>Optional salary range information</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <PlainTextInput
                     form={form}
                     label={'Minimum Salary'}
                     name={'salaryMin'}
                     placeholder={'200000'}
                     type={'text'}/>
                  
                  <PlainTextInput
                     form={form}
                     label={'Maximum Salary'}
                     name={'salaryMax'}
                     placeholder={'300000'}
                     type={'text'}/>
                  
                </CardContent>
              </Card>

              {/* Skills & Tags */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r py-4 -mt-6 from-purple-50 to-pink-50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Tag className="h-5 w-5 text-purple-600" />
                    Skills & Tags
                  </CardTitle>
                  <CardDescription>Add relevant skills and technologies</CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag(currentTag))}
                      placeholder="Add a skill or tag"
                      className="h-11"
                    />
                    <Button type="button" onClick={() => addTag(currentTag)} size="icon" className="h-11 w-11">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Popular tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_TAGS.map((tag) => (
                        <Button
                          key={tag}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addTag(tag)}
                          disabled={tags.includes(tag)}
                          className="h-8 text-xs"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Settings & Actions */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="isActive"
                      checked={isActive}
                      onCheckedChange={(checked) => setIsActive(checked)}
                    />
                    <div>
                      <Label htmlFor="isActive" className="text-base font-medium cursor-pointer">
                        Publish immediately
                      </Label>
                      <p className="text-sm text-gray-500">Uncheck to save as draft</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" size="lg" className="px-8 bg-transparent">
                      Save Draft
                    </Button>
                    <BlueButton
                    isPending={mutation.isPending}
                    isPendingName={"Saving.."}
                    name={"Save Job"}
                      type={'submit'}
                      />
                    
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
      </Form>
        </div>
      </div>
    </div>
  )
}
