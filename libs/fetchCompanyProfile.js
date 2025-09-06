import axios from "axios";

export const fetchCompanyProfile = async ({ queryKey }) => {
  const [_key, slug] = queryKey;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/company/${slug}`,
    { withCredentials: true }
  );
  return res.data.data;
};
