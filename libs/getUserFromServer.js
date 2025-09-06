import axios from "axios";

export async function getUserFromServer() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`,
      {
        withCredentials: true,
      }
    );

    return res.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
