"use client";

import { useRouter } from "next/navigation";

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

import { useSignUp } from "../apis/use-sign-up";
import { TSignUpFormSchema, signUpFormSchema } from "../schemas";

export const SignUpForm = () => {
  const form = useForm<TSignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const signUp = useSignUp();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = (values: TSignUpFormSchema) => {
    signUp.mutate(values, {
      onSuccess: () => router.push("/"),
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <SubmitButton className="w-full" isPending={signUp.isPending}>
          Sign Up
        </SubmitButton>
      </form>
    </Form>
  );
};
