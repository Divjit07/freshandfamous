"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "w-full border-b border-white/20 bg-transparent py-3 font-body text-base font-light text-background placeholder:text-background/35 transition-colors duration-300 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  function set(key: keyof typeof values, v: string) {
    setValues((s) => ({ ...s, [key]: v }));
    if (status === "error") setStatus("idle");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) return fail("Tell us your name.");
    if (!EMAIL.test(values.email)) return fail("Enter a valid email address.");
    if (values.message.trim().length < 4) return fail("Add a short message.");
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not send. Try again.");
      }
      setStatus("success");
    } catch (err) {
      fail(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-accent/40 bg-accent/[0.06] p-8">
        <p className="font-display text-2xl text-background">
          Thank you, {values.name.split(" ")[0] || "friend"}.
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed font-light text-background/60">
          The house reads every note. Expect a reply within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="c-name"
          className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase"
        >
          Name
        </label>
        <input
          id="c-name"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="c-email"
          className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase"
        >
          Email
        </label>
        <input
          id="c-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="you@email.com"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="c-message"
          className="font-body text-eyebrow font-medium tracking-luxe text-accent uppercase"
        >
          Message
        </label>
        <textarea
          id="c-message"
          rows={4}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="How can the house help?"
          className={cn(fieldClass, "resize-none")}
        />
      </div>

      {error && (
        <p role="alert" className="font-body text-micro text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative flex w-fit items-center gap-3 overflow-hidden border border-accent px-8 py-4 font-body text-micro font-semibold tracking-luxe text-accent uppercase transition-colors duration-500 ease-[var(--ease-quiet)] hover:text-foreground disabled:opacity-50"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-quiet)] group-hover:scale-x-100"
        />
        <span className="relative">
          {status === "submitting" ? "Sending…" : "Send message"}
        </span>
      </button>
    </form>
  );
}
