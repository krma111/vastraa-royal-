export default function ThankYou() {
  return (
    <section className="section">
      <div className="container prose">
        <h1>Thank you — enquiry received ✓</h1>
        <p>We&apos;ll message you once for consultation. No payment, no spam.</p>
        <p><strong>Optional next step:</strong> join the WhatsApp community for early previews.</p>
        <a className="btn btn-gold" href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || "/community"}>
          Join WhatsApp Community
        </a>
        <p style={{ marginTop: 16 }}>
          <a href="/">← Back to home</a>
        </p>
      </div>
    </section>
  );
}
