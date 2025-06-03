"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/options";

export default async function fetchUserAtServer () {
  const  session = await getServerSession(authOptions);
  console.log(session);
  
  if (!session) return null;
  return session.user;
}
