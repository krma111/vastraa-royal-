import LeadForm from "@/components/LeadForm";
import InterestCounter from "@/components/InterestCounter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vastraa Royale — Premium Saree Sets | Enquiry-Only Launch",
  description:
    "Premium saree set (saree + blouse + footwear), ₹8,000–₹12,000 indicative. Enquiry-only: no payment, no shipping yet. Join the interest list.",
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">Enquiry-only launch • No payment yet</span>
          <h1>
            A royal-heritage saree look,
            <br />
            complete set, honest price.
          </h1>
          <p className="sub">
            Vastraa Royale curates a premium saree set — saree + blouse +
            footwear — in the ₹8,000–₹12,000 indicative band. We are
            validating demand first. Tell us you&apos;re interested; we
            consult, then we stock.
          </p>
          <InterestCounter />
          <div style={{ marginTop: 8 }}>
            <a className="btn" href="#enquire">
              Enquire Now
            </a>{" "}
            <a className="btn btn-ghost" href="/collection">
              View direction
            </a>
          </div>
          <div className="disclaimer">
            Currently enquiry-only. We take no money, promise no delivery
            dates, and make no &ldquo;pure silk / handwoven&rdquo; claims
            unless certified. Returns policy will be published before our
            first sale.
          </div>
        </div>
      </section>

      <section className="section" id="enquire">
        <div className="container grid2">
          <div>
            <h2>Join the interest list</h2>
            <p>
              Name + WhatsApp only. City, occasion and budget are optional
              and help us prioritise what to source first.
            </p>
            <ul className="small">
              <li>✓ One consultation message — no spam</li>
              <li>✓ No payment link sent until stock + GST are ready</li>
              <li>✓ Unsubscribe anytime by replying STOP</li>
            </ul>
            <h3 style={{ marginTop: 24 }}>What happens next?</h3>
            <ol className="small">
              <li>You enquire (30 seconds).</li>
              <li>We message you for style/occasion fit.</li>
              <li>If demand proves out, we stock, publish shipping + returns, then invite you to order.</li>
            </ol>
          </div>
          <div className="card">
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff", borderTop: "1px solid #e9ddc9" }}>
        <div className="container">
          <h2>Why enquiry-only?</h2>
          <div className="grid2">
            <div className="card">
              <strong>Zero loss for you</strong>
              <p className="small">
                You pay nothing until we have verified stock, honest fabric
                details, and a published shipping + returns policy.
              </p>
            </div>
            <div className="card">
              <strong>Zero blame for us</strong>
              <p className="small">
                No delivery promises, no unverified fabric claims, no copied
                photos, no fake reviews. Only own or licensed imagery.
              </p>
            </div>
          </div>
          <p className="small" style={{ marginTop: 16 }}>
            Positioning: authentic royal-heritage look, complete set, honest
            pricing. Competitors (Ekaya, Tilfi, Raw Mango, Kankatala) sell
            sarees; we validate a <em>set</em> (saree + blouse + footwear)
            before holding inventory.
          </p>
        </div>
      </section>
    </>
  );
}
