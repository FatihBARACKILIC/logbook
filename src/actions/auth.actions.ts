import { COOKIE_KEYS } from "@/lib/constants/cookie.constants";
import { sendSignInMail } from "@/lib/mail/sign-in.mail";
import { createSession } from "@/services/sessions";
import { deleteSession } from "@/services/sessions/delete.sessions";
import { createUserIfNotExist, getFirstUserById } from "@/services/user";
import {
  createVerificationToken,
  getVerificationTokenTime,
  verifyAndDeleteVerificationToken
} from "@/services/verification-tokens";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:content";

export const authActions = {
  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email()
    }),
    handler: async ({ email }, c) => {
      const user = await createUserIfNotExist({ email });
      if (!user) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "User not found"
        });
      }
      // TODO: Kullanıcının hesabının silinme durumunu kontrol et
      const { id: userId } = user;
      const { code } = createVerificationToken({ type: "sign-in", c });
      sendSignInMail(email, code);
      c.session?.set("user", { userId });
      return { message: "Verification code sent to your email" };
    }
  }),
  verifySignIn: defineAction({
    accept: "form",
    input: z.object({
      otp: z
        .string()
        .length(8)
        .regex(/^[a-zA-Z0-9]+$/)
    }),
    handler: async ({ otp }, c) => {
      const user = await c.session?.get("user");
      if (!user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not found"
        });
      }
      const { userId } = user;
      const isVerified = await verifyAndDeleteVerificationToken({ otp, type: "sign-in", c });
      if (!isVerified) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Invalid or expired verification code"
        });
      }
      const sessionToken = c.cookies.get(COOKIE_KEYS.SESSION_KEY)?.value;
      if (!sessionToken) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Session token is missing. Please try again."
        });
      }
      const [userData] = await Promise.all([
        getFirstUserById(userId),
        createSession({
          userId,
          sessionToken,
          userAgent: c.request.headers.get("user-agent"),
          ipAddress: c.clientAddress
        })
      ]);
      if (!userData) {
        c.session?.delete("user");
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "User not found"
        });
      }
      c.session?.set("user", {
        userId: userData.id,
        email: userData.email
      });
      return { message: "Sign in successful" };
    }
  }),
  changeEmail: defineAction({
    handler: async (_input, c) => {
      c.session?.delete("user");
      return { message: "Email changed" };
    }
  }),
  resendOtp: defineAction({
    handler: async (_input, c) => {
      const createdAt = await getVerificationTokenTime(c, "sign-in");
      if (!createdAt) {
        c.session?.delete("user");
        c.session?.set("verificationTokens", { "sign-in": undefined });
        throw new Error("Session Not Found");
      }
      const secondsUntilResend = Math.ceil(60 - (Date.now() - createdAt.getTime()) / 1000);
      if (secondsUntilResend > 0) {
        throw new ActionError({
          code: "TOO_MANY_REQUESTS",
          message: `Please wait ${secondsUntilResend} seconds before requesting a new token.`
        });
      }
      const session = await c.session?.get("user");
      if (!session) {
        throw new ActionError({
          code: "NOT_FOUND",
          message: "User not found"
        });
      }
      const user = await getFirstUserById(session?.userId);
      if (!user) {
        c.session?.delete("user");
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "User not found"
        });
      }
      const { email } = user;
      const { code } = createVerificationToken({ type: "sign-in", c });
      sendSignInMail(email, code);

      return { message: "Verification code sent to your email" };
    }
  }),
  signOut: defineAction({
    handler: async (_input, c) => {
      const session = c.cookies.get(COOKIE_KEYS.SESSION_KEY);
      const user = await c.session?.get("user");
      if (!session || !user) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User not found"
        });
      }
      c.session?.delete("user");
      await deleteSession(session.value, user.userId);
      return { message: "User signed out successfully." };
    }
  })
};
