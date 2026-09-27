export default function Faq() {
  const faqs: [string, string][] = [
    ["Can I buy today?", "No. We are enquiry-only. We collect interest and consult. No payment links are sent until stock, GST clarity, and published shipping/returns policies exist."],
    ["What is the price?", "Indicative band ₹8,000–₹12,000 for a 3-piece set (saree + blouse + footwear). Final pricing is confirmed only before first sale."],
    ["When will I get delivery?", "We promise no delivery dates during validation. Shipping timelines will be published before the first sale."],
    ["Is it pure silk / handwoven?", "We make no such claim unless certified. Exact fibre and weave details will be published per product after sourcing."],
    ["What photos do you use?", "Only our own phone photos or licensed stock with proof. We never copy Google/Pinterest images."],
    ["How do I stop messages?", "Reply STOP on WhatsApp anytime. We send one consultation message unless you opt in for more."],
  ];
  return (
    <section className="section">
      <div className="container prose">
        <h1>FAQ</h1>
        {faqs.map(([q, a]) => (
          <div key={q} className="card" style={{ marginBottom: 12 }}>
            <strong>{q}</strong>
            <p className="small">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
