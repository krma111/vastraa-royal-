"use client";

import { useState } from "react";

const WHATSAPP_LINK = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "#";

type Status = "idle" | "sending" | "done" | "error";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  function validate(): string[] {
    const e: string[] = [];
    if (name.trim().length < 2 || name.trim().length > 80)
      e.push("Please enter your full name (2–80 characters).");
    // Allow +91, spaces, dashes. Must contain 10 digits (India default).
    const digits = whatsapp.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
    if (!/^\d{10}$/.test(digits))
      e.push("Please enter a valid 10-digit WhatsApp number.");
    if (city && city.length > 60) e.push("City must be under 60 characters.");
    if (!consent) e.push("Please tick the consent checkbox to proceed.");
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerMsg("");
    const v = validate();
    setErrors(v);
    if (v.length > 0) return;

    // Simple client rate-limit: 1 submission / 15s
    const last = Number(localStorage.getItem("vr_last_submit") || 0);
    if (Date.now() - last < 15000) {
      setErrors(["Please wait a few seconds before submitting again."]);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: whatsapp.trim(),
          city: city.trim(),
          occasion,
          budget,
          consent,
          website, // honeypot — bots fill it
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Submission failed.");
      localStorage.setItem("vr_last_submit", String(Date.now()));
      setStatus("done");
      // Redirect to thank-you after brief success display
      window.location.href = "/thank-you";
    } catch (err: unknown) {
      setStatus("error");
      setServerMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="ok-box">
        <strong>Thank you! Your enquiry is recorded.</strong>
        <p className="small">
          Join our WhatsApp community for early previews (optional):
        </p>
        <a className="btn btn-gold" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
          Join WhatsApp Community
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Enquiry form">
      <label htmlFor="vr-name">Full name *</label>
      <input
        id="vr-name"
        name="name"
        autoComplete="name"
        placeholder="e.g. Ananya Sharma"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="vr-wa">WhatsApp number *</label>
      <input
        id="vr-wa"
        name="whatsapp"
        inputMode="tel"
        autoComplete="tel"
        placeholder="10-digit mobile, e.g. 98765 43210"
        value={whatsapp}
        onChange={(e) => setWhatsapp(e.target.value)}
        required
      />

      <div className="grid2">
        <div>
          <label htmlFor="vr-city">City (optional)</label>
          <input
            id="vr-city"
            name="city"
            autoComplete="address-level2"
            placeholder="e.g. Jaipur"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="vr-occasion">Occasion (optional)</label>
          <select
            id="vr-occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="">Select…</option>
            <option>Wedding</option>
            <option>Festive</option>
            <option>Gifting</option>
            <option>Daily Elegance</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <label htmlFor="vr-budget">Budget range (optional)</label>
      <select id="vr-budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
        <option value="">Select…</option>
        <option>₹8,000 – ₹10,000</option>
        <option>₹10,000 – ₹12,000</option>
        <option>₹12,000+ (future range)</option>
        <option>Just exploring</option>
      </select>

      {/* Honeypot — humans never see/fill this */}
      <input
        className="honeypot"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        aria-hidden
      />

      <div className="check-row">
        <input
          id="vr-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <label htmlFor="vr-consent" style={{ fontWeight: 400, margin: 0 }}>
          I agree to be contacted by Vastraa Royale on WhatsApp/SMS/email
          about this enquiry, and I accept the{" "}
          <a href="/privacy">Privacy Policy</a>. I understand this is an
          enquiry-only list — no order or payment is taken. *
        </label>
      </div>

      {errors.length > 0 && (
        <div role="alert" style={{ marginTop: 12 }}>
          {errors.map((er) => (
            <div key={er} className="err">
              • {er}
            </div>
          ))}
        </div>
      )}
      {status === "error" && serverMsg && (
        <div className="err" role="alert">
          {serverMsg}
        </div>
      )}

      <div style={{ marginTop: 18 }}>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Enquire Now — No Payment"}
        </button>
        <p className="small" style={{ marginTop: 10 }}>
          No payment gateway. No shipping yet. No spam — one consultation
          message only unless you opt in for more.
        </p>
      </div>
    </form>
  );
}
