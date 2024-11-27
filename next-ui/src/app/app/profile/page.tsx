import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { UserInfo } from "@/features/profile/components/user-info";

export default async function ProfilePage() {
  return (
    <div>
      <h1>Profile Page</h1>
      <UserInfo />
      <SignOutButton />
    </div>
  );
}
