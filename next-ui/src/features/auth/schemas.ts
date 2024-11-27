import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required.",
  }),
  email: z.string().trim().email({
    message: "Invalid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters.",
  }),
});
export type TSignUpFormSchema = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = z.object({
  email: z.string().trim().email({
    message: "Invalid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters.",
  }),
});
export type TSignInFormSchema = z.infer<typeof signInFormSchema>;
