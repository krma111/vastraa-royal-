export default function Privacy() {
  return (
    <section className="section">
      <div className="container prose">
        <h1>Privacy Policy</h1>
        <p className="small">Last updated: September 2026. Enquiry-only launch version.</p>
        <h2>What we collect</h2>
        <ul>
          <li>Required: name, WhatsApp number, consent record + timestamp.</li>
          <li>Optional: city, occasion, budget.</li>
          <li>Technical: basic rate-limit logs (IP, timestamp) for abuse prevention.</li>
        </ul>
        <h2>Why (India DPDP + GDPR basis: consent)</h2>
        <p>To contact you once for consultation about your enquiry. Further messages only if you opt in (e.g. WhatsApp community join).</p>
        <h2>Storage</h2>
        <p>Leads are stored in Airtable (base &quot;Vastraa Royale&quot;, table &quot;Leads&quot;). Access is restricted to the founder.</p>
        <h2>Your rights</h2>
        <ul>
          <li>Withdraw consent anytime: reply STOP or email us via <a href="/contact">Contact</a>.</li>
          <li>Request access / correction / deletion of your enquiry data.</li>
          <li>We delete non-converted enquiry data on request within 30 days.</li>
        </ul>
        <h2>What we never do</h2>
        <ul>
          <li>No sale of data. No payment data collected (no gateway).</li>
          <li>No marketing without separate opt-in.</li>
        </ul>
        <h2>Contact</h2>
        <p>Data fiduciary: [Your Real Name], [City, State]. Replace before launch. Grievance: reply via <a href="/contact">Contact page</a>.</p>
      </div>
    </section>
  );
}
