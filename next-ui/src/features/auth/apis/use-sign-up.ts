import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

import { TSignUpFormSchema } from "../schemas";

const signUp = (data: TSignUpFormSchema): Promise<{ message: string }> => {
  return api
    .post("/auth/sign-up", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
};

export const useSignUp = () =>
  useMutation({
    mutationFn: signUp,
    onError: (error) => error,
  });
