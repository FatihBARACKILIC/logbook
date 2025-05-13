import type { ActionAPIContext } from "astro:actions";

export async function getVerificationTokenTime(
  c: ActionAPIContext,
  tokenType: keyof App.SessionData["verificationTokens"]
) {
  const tokens = await c.session?.get("verificationTokens");
  if (!tokens?.[tokenType]) {
    return undefined;
  }
  return tokens[tokenType].createdAt;
}
