import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let name = "";
  let email = "";
  let message = "";
  try {
    ({ name, email, message } = await req.json());
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  if (!String(name).trim()) {
    return Response.json({ error: "Tell us your name." }, { status: 400 });
  }
  if (!EMAIL.test(String(email))) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (String(message).trim().length < 4) {
    return Response.json({ error: "Add a short message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  // No email service wired yet — accept gracefully so the form still confirms.
  if (!key) return Response.json({ ok: true, delivered: false });

  const resend = new Resend(key);
  const to = process.env.CONTACT_TO_EMAIL ?? "concierge@freshandfamous.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: String(email),
      subject: `New enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : "Could not send.";
    return Response.json({ error: errMessage }, { status: 500 });
  }
}
