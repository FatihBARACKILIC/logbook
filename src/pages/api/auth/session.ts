import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ session, site }) => {
  const user = await session?.get("user");
  if (!user?.email) {
    session?.delete("user");
    return Response.redirect(new URL("/auth/sign-in", site));
  }
  return Response.json(user);
};
