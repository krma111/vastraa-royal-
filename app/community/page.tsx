export default function Community() {
  const link = process.env.NEXT_PUBLIC_WHATSAPP_LINK || "#";
  return (
    <section className="section">
      <div className="container prose">
        <h1>WhatsApp Community</h1>
        <p>Get early previews and consultation. Optional — joining is not required for your enquiry to be counted.</p>
        <a className="btn btn-gold" href={link} target="_blank" rel="noreferrer">
          Join WhatsApp Community
        </a>
        <p className="small" style={{ marginTop: 12 }}>
          If the button shows &quot;#&quot;, set NEXT_PUBLIC_WHATSAPP_LINK in .env.local / Vercel env vars.
          Rules: no spam, no payment links from members, admin-only announcements during validation.
        </p>
        <h2>Welcome message (paste into group description)</h2>
        <div className="card small">
          Welcome to Vastraa Royale (enquiry-only) 👑<br />
          We curate premium saree sets (saree + blouse + footwear). No orders or payments yet — we consult first.
          Reply STOP to opt out anytime.
        </div>
      </div>
    </section>
  );
}
