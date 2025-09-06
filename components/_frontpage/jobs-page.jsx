"use client";
import AllJobs from "@/components/_job-categories/all-jobs";
import ContractJobs from "@/components/_job-categories/contract-job";
import InternshipJobs from "@/components/_job-categories/internship-jobs";
import RemoteJobs from "@/components/_job-categories/remote-jobs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function JobsPage() {
  const searchParams = useSearchParams();
  const remote = searchParams.get("remote");
  const contract = searchParams.get("contract");
  const internship = searchParams.get("internship");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobs", { remote, contract, internship }],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/jobs/public-jobs`
      );
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });

 


  let Component = AllJobs;
  if (searchParams.toString().includes("remote")) Component = RemoteJobs;
  else if (searchParams.toString().includes("contract")) Component = ContractJobs;
  else if (searchParams.toString().includes("internship")) Component = InternshipJobs;

  return <Component data={data} isLoading={isLoading} />;
}
