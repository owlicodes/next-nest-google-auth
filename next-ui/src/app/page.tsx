import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div>
        <h1 className="mb-8 text-3xl font-bold">Welcome to next-nest-auth</h1>

        {!session?.user ? (
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/sign-in" className="link">
              Sign in
            </Link>
            <Link href="/auth/sign-up" className="link">
              Sign up
            </Link>
          </div>
        ) : (
          <Link href="/app/profile" className="link">
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}
