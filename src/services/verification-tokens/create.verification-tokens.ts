import { EXPIRATION_TIMES } from "@/lib/constants/expiration-times.constants";
import { generateToken } from "@/lib/utils/generate-token";
import type { ActionAPIContext } from "astro:actions";

type CreateVerificationToken<Type> = {
  type: Type;
  c: ActionAPIContext;
};

export function createVerificationToken<
  Type extends keyof Omit<App.SessionData["verificationTokens"], "userId">
>({
  type,
  c
}: CreateVerificationToken<Type>): NonNullable<App.SessionData["verificationTokens"][Type]> {
  const code = generateToken().toUpperCase();
  const createdAt = new Date();
  c.session?.set(
    "verificationTokens",
    { [type]: { code, createdAt } },
    { ttl: EXPIRATION_TIMES.EMAIL_VERIFICATION_TOKEN }
  );
  return { code, createdAt };
}
