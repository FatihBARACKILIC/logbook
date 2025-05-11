import astroConfig from "astro.config.mjs";
import { sendMail } from "./mail";

const text = (token: string) => `Hello,

To sign in to your account, please use the verification code below:

Verification Code: ${token}

If you did not request this, you can safely ignore this email.
`;

const html = (token: string) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Sign-In Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Hello,</h2>
      <p>To sign in to your account, please use the verification code below:</p>

      <p style="margin: 20px 0; font-size: 18px;">
        <strong>Verification Code:</strong><br />
        <span style="display: inline-block; padding: 10px 15px; background-color: #f0f0f0; border-radius: 5px; font-size: 20px; font-weight: bold; color: #333;">
          ${token}
        </span>
      </p>

      <p style="margin-top: 30px; color: #888; font-size: 12px;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  </body>
</html>
`;

export async function sendSignInMail(email: string, token: string) {
  token = token.toUpperCase();
  const subject = "Sign in to your account";
  await sendMail(email, subject, text(token), html(token));
}
