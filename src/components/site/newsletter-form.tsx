"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email)) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not subscribe. Try again.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        className="font-body text-sm leading-relaxed font-light text-secondary"
      >
        <span className="text-accent">Welcome to the house.</span> Look for the
        first dispatch from the 416.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex items-end gap-4 border-b border-ink/25 pb-3 transition-colors duration-300 focus-within:border-accent">
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          disabled={status === "submitting"}
          aria-invalid={status === "error"}
          aria-describedby={error ? "nl-error" : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="min-w-0 flex-1 bg-transparent font-body text-base font-light text-ink placeholder:text-secondary/45 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="shrink-0 font-body text-eyebrow font-semibold tracking-luxe text-accent uppercase transition-opacity duration-300 hover:opacity-70 disabled:opacity-40"
        >
          {status === "submitting" ? "Joining…" : "Join"}
        </button>
      </div>
      {error && (
        <p id="nl-error" role="alert" className="mt-3 font-body text-micro text-accent">
          {error}
        </p>
      )}
    </form>
  );
}
