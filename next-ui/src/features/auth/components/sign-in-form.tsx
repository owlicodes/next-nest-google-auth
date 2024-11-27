"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/features/common/components/submit-button";
import { useToast } from "@/hooks/use-toast";

import { useSignIn } from "../apis/use-sign-in";
import { TSignInFormSchema, signInFormSchema } from "../schemas";
import { GoogleSignInButton } from "./google-sign-in-button";

export const SignInForm = () => {
  const form = useForm<TSignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const signIn = useSignIn();
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onSubmit = (values: TSignInFormSchema) => {
    signIn.mutate(values, {
      onSuccess: () => {
        if (!callbackUrl) {
          router.push("/");
        } else {
          window.location.href = callbackUrl;
        }
      },
      onError: (error) =>
        toast({
          title: error.message,
          variant: "destructive",
        }),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton className="w-full" isPending={signIn.isPending}>
          Sign In
        </SubmitButton>
        <div>
          <GoogleSignInButton />
        </div>
      </form>
    </Form>
  );
};
