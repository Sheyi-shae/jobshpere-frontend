"use client"

import EditJobPost from "@/components/_jobs/edit-job-form";
import { useSearchParams } from "next/navigation";

export default function EditPage() {
     const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const slug = searchParams.get("slug");
    
   
  return (
    <div>
        <EditJobPost jobSlug={slug}/>
    </div>
  )
}
