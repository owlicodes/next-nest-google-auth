import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

const getProfile = (): Promise<{ id: string; name: string; email: string }> => {
  return api
    .get("/users/profile")
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
