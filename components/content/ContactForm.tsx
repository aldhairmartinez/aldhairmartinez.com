"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Status = "idle" | "submitting" | "success" | "error";

const fieldClasses =
  "w-full rounded-[4px] border border-border bg-bg-overlay px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint transition-colors focus:outline-none focus:border-accent-secondary";

const labelClasses = "font-mono text-[11px] uppercase tracking-wide text-text-faint";

// Local dev only — there is no production backend yet, so this component is
// entirely inert (renders nothing) unless NEXT_PUBLIC_API_URL is set.
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!API_URL) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail?.[0]?.msg ?? `Request failed (${res.status})`);
      }

      await res.json();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className={labelClasses}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className={labelClasses}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className={fieldClasses}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={cn(fieldClasses, "resize-none")}
        />
      </div>

      <div className="flex items-center gap-4 pt-1">
        <Button type="submit" variant="primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>

        {status === "success" && (
          <span className="font-mono text-xs uppercase tracking-wide text-status-ok">
            Message received
          </span>
        )}
        {status === "error" && (
          <span className="font-mono text-xs uppercase tracking-wide text-status-alert">
            {errorMessage || "Something went wrong"}
          </span>
        )}
      </div>
    </form>
  );
}
