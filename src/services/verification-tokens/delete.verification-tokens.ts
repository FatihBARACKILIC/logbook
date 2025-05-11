import type { ActionAPIContext } from "astro:actions";

type VerifyAndDeleteVerificationToken = {
  otp: string;
  type: keyof Omit<App.SessionData["verificationTokens"], "userId">;
  c: ActionAPIContext;
};

export async function verifyAndDeleteVerificationToken({
  otp,
  type,
  c
}: VerifyAndDeleteVerificationToken) {
  const tokens = await c.session?.get("verificationTokens");
  if (tokens?.["sign-in"] && tokens?.["sign-in"].code.toUpperCase() === otp.toUpperCase()) {
    c.session?.set("verificationTokens", { [type]: undefined });
    return true;
  }
  return false;
}
