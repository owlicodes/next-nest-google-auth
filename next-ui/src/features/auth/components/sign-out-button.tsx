"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  const handleSignOut = () =>
    signOut({
      callbackUrl: "/auth/sign-in",
      redirect: true,
    });

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};
