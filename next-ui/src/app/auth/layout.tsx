import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

import { getServerSession } from "next-auth";

import { Card, CardContent } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/app/profile");

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Card className="w-[400px]">
        <CardContent className="p-4">
          <div>{children}</div>
        </CardContent>
      </Card>
    </div>
  );
}
