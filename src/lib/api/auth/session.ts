import type { Session } from "@/lib/types/session.types";

export async function getSession(): Promise<Session> {
  const response = await fetch("http://localhost:4321/api/auth/session");
  const json = await response.json();
  // TODO: Add Validation
  return json;
}
