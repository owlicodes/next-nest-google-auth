import Link from "next/link";

import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function SignInPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-center text-xl font-bold">
        Sign in to <span className="text-brand">next-nest-auth</span>
      </h1>
      <p className="text-center text-sm text-gray-500">
        Sign in back to your account
      </p>
      <SignInForm />
      <p className="text-center text-sm">
        Don&apos;t have an account yet?{" "}
        <Link href="/auth/sign-up" className="link">
          Sign up
        </Link>{" "}
        instead.
      </p>
    </div>
  );
}
