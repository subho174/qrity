'use client';

import { useSession } from "next-auth/react";

export function FetchUser() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) return null;
  return session.user;
}
