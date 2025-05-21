import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, session, site }) => {
  const { user } = locals;
  if (!user) {
    session?.delete("user");
    return Response.redirect(new URL("/auth/sign-in", site));
  }
  return Response.json(user);
};
