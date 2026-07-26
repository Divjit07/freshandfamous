import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let email = "";
  try {
    ({ email } = await req.json());
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  if (!EMAIL.test(String(email))) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  // No email service wired yet — accept gracefully so the form still confirms.
  if (!key) return Response.json({ ok: true, delivered: false });

  const resend = new Resend(key);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  try {
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false });
    } else {
      const to = process.env.CONTACT_TO_EMAIL ?? "concierge@freshandfamous.com";
      const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
      await resend.emails.send({
        from,
        to,
        subject: "New newsletter signup",
        text: `New signup for the 6ES list: ${email}`,
      });
    }
    return Response.json({ ok: true, delivered: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not subscribe.";
    return Response.json({ error: message }, { status: 500 });
  }
}
