import { useQuery } from "@tanstack/react-query";
import { fetchCompanyProfile } from "./fetchCompanyProfile"; 

export function useCompanyProfile(slug) {
  return useQuery({
    queryKey: ["company_profile", slug],
    queryFn: fetchCompanyProfile,
   // staleTime: 5 * 60 * 1000, // cache for 5 mins
    retry: false,
    enabled: !!slug, // prevents firing with undefined slug
  });
}
