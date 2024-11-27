import Link from "next/link";

import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-center text-xl font-bold">
        Sign up to <span className="text-brand">next-nest-auth</span>
      </h1>
      <p className="text-center text-sm text-gray-500">Create a new account</p>
      <SignUpForm />
      <p className="text-center text-sm">
        Alread have an account?{" "}
        <Link href="/auth/sign-in" className="link">
          Sign in
        </Link>{" "}
        instead.
      </p>
    </div>
  );
}
