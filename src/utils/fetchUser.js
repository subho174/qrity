"use client";

import { useSession } from "next-auth/react";

export default function FetchUser() {
  const { data: session } = useSession();
  
  if (!session) return null;
  return session.user;
}
