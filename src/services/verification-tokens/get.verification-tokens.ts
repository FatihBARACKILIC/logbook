import type { ActionAPIContext } from "astro:actions";

export async function getVerificationTokenTime(
  c: ActionAPIContext,
  tokenType: keyof App.SessionData["verificationTokens"]
) {
  const tokens = await c.session?.get("verificationTokens");
  if (!tokens?.[tokenType]) {
    c.session?.delete("user");
    c.session?.set("verificationTokens", { [tokenType]: undefined });
    throw new Error("Session Not Found");
  }
  return tokens[tokenType].createdAt;
}
