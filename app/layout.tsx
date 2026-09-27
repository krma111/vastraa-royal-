import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vastraa Royale — Premium Saree Sets (Enquiry Only)",
  description:
    "Vastraa Royale curates premium saree sets (saree + blouse + footwear). Currently enquiry-only. No orders, no payments yet. Join the interest list.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vastraaroyale.com"
  ),
  openGraph: {
    title: "Vastraa Royale — Premium Saree Sets",
    description:
      "Authentic royal-heritage look, complete set, honest pricing. Enquiry-only launch.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-inner">
            <a className="brand" href="/">
              Vastraa <span>Royale</span>
            </a>
            <nav className="nav" aria-label="Primary">
              <a href="/collection">Collection</a>
              <a href="/about">About</a>
              <a href="/faq">FAQ</a>
              <a href="/community">Community</a>
              <a href="/contact">Contact</a>
            </nav>
            <a className="btn" href="/#enquire">
              Enquire
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-grid">
            <div>
              <strong>Vastraa Royale</strong>
              <p className="small">
                Premium saree sets (saree + blouse + footwear).
                Currently enquiry-only. We take no payments, promise no
                delivery dates, and publish our returns policy before our
                first sale.
              </p>
              <p className="small">
                Instagram / Pinterest: @vastraaroyale
                <br />
                Legal: sole proprietor operating under your real name, your
                city/state. No fake address.
              </p>
            </div>
            <div>
              <strong>Explore</strong>
              <br />
              <a href="/about">About</a>
              <br />
              <a href="/collection">Collection</a>
              <br />
              <a href="/faq">FAQ</a>
              <br />
              <a href="/community">WhatsApp Community</a>
            </div>
            <div>
              <strong>Legal</strong>
              <br />
              <a href="/shipping">Shipping</a>
              <br />
              <a href="/returns">Returns</a>
              <br />
              <a href="/privacy">Privacy</a>
              <br />
              <a href="/terms">Terms</a>
            </div>
          </div>
          <div className="container">
            <p className="small">
              © {new Date().getFullYear()} Vastraa Royale. Photos: use only
              your own phone photos or licensed stock with proof. Check
              trademark at ipindia.gov.in before printing logo.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
