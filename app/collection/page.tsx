export default function Collection() {
  return (
    <section className="section">
      <div className="container prose">
        <h1>Collection direction (preview)</h1>
        <p>
          We have not stocked inventory yet. Below is the <em>direction</em> we
          will source if enquiries validate demand. No orders can be placed
          from this page.
        </p>
        <table className="spec">
          <thead>
            <tr><th>Set</th><th>Look</th><th>Indicative band</th></tr>
          </thead>
          <tbody>
            <tr><td>Heritage Maroon Set</td><td>Deep maroon drape + gold blouse + juttis</td><td>₹8,000–₹12,000</td></tr>
            <tr><td>Ivory Gold Set</td><td>Ivory drape + gold accents + heels</td><td>₹8,000–₹12,000</td></tr>
            <tr><td>Festive Emerald Set</td><td>Jewel tone drape + tailored blouse + juttis</td><td>₹8,000–₹12,000</td></tr>
          </tbody>
        </table>
        <p className="small">
          Fabric details will be published only after sourcing with lab /
          supplier certification. We will not label anything &ldquo;pure silk&rdquo;
          or &ldquo;handwoven&rdquo; without proof.
        </p>
        <a className="btn" href="/#enquire">Enquire about a set</a>
      </div>
    </section>
  );
}
