"use client";

import { useProfile } from "../apis/use-profile";

export const UserInfo = () => {
  const profile = useProfile();

  return (
    <div>
      <h1>User Info</h1>
      <pre>{JSON.stringify(profile.data, undefined, 2)}</pre>
    </div>
  );
};
