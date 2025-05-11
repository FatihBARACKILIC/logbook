import {
  MAIL_HOST,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_SECURE,
  MAIL_SERVICE,
  MAIL_USER
} from "astro:env/server";

import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: MAIL_SERVICE,
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_SECURE,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD
  }
});

/**
 * The function `sendMail` sends an email with specified content to a recipient using a transporter.
 * @param {string} to - The `to` parameter in the `sendMail` function is the email address of the
 * recipient to whom the email will be sent.
 * @param {string} subject - The `subject` parameter in the `sendMail` function is a string that
 * represents the subject of the email that will be sent. It typically describes the main topic or
 * purpose of the email.
 * @param {string} text - The `text` parameter in the `sendMail` function is used to specify the plain
 * text content of the email that will be sent. This text will be included in the email body for
 * recipients who prefer to view emails in plain text format.
 * @param {string} html - The `html` parameter in the `sendMail` function is a string that represents
 * the HTML content of the email you want to send. This allows you to include formatted text, images,
 * links, and other HTML elements in the email body.
 */
export async function sendMail(to: string, subject: string, text: string, html: string) {
  try {
    await transporter.sendMail({ from: MAIL_USER, to, subject, text, html });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
