import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

import { TSignInFormSchema } from "../schemas";

export const useSignIn = () =>
  useMutation({
    mutationFn: async (data: TSignInFormSchema) => {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        if (result.status === 401) throw new Error("User not authorized.");
        throw new Error(result.error);
      }

      return result;
    },
  });
