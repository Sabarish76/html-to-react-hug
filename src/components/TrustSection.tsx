const logos = [
  { icon: "🏦", title: "Company 1" },
  { icon: "🏥", title: "Company 2" },
  { icon: "🏛️", title: "Company 3" },
  { icon: "🔬", title: "Company 4" },
  { icon: "✈️", title: "Company 5" },
  { icon: "⚡", title: "Company 6" },
];

const TrustSection = () => (
  <section className="trust-section" aria-labelledby="trustTitle">
    <div className="trust-card reveal-scale">
      <p className="trust-card-label" id="trustTitle">Trusted by teams in regulated industries</p>
      <div className="trust-logos" role="list">
        {logos.map((l) => (
          <div key={l.title} className="trust-logo" role="listitem" title={l.title}>{l.icon}</div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
