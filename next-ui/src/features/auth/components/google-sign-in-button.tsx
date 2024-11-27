import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/app/profile",
    });
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={handleGoogleSignIn}
    >
      Sign In With Google
    </Button>
  );
};
