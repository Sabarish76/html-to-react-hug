import { useEffect } from "react";

const features = [
  {
    icon: "🤖",
    name: "Automated Audits",
    desc: "Framework mapping with continuous evidence collection and drift detection across cloud accounts.",
    colorClass: "fc-blue",
    iconClass: "fi-blue",
    delay: "d1",
  },
  {
    icon: "⚡",
    name: "Real-time Threats",
    desc: "Agentic detections from cloud activity + config posture signals. Faster MTTR with guided workflows.",
    colorClass: "fc-green",
    iconClass: "fi-green",
    delay: "d2",
  },
  {
    icon: "📊",
    name: "Unified Tracking",
    desc: "Multi-tenant posture, remediation queue, and executive-ready reports across regions and clouds.",
    colorClass: "fc-orange",
    iconClass: "fi-orange",
    delay: "d3",
  },
];

const FeaturesSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal,.reveal-left,.reveal-scale").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".feat-card");
    const handlers: Array<{ el: Element; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach((card) => {
      const move = (e: MouseEvent) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        (card as HTMLElement).style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
        (card as HTMLElement).style.transition = "transform .1s linear";
      };
      const leave = () => {
        (card as HTMLElement).style.transform = "";
        (card as HTMLElement).style.transition = "transform .5s cubic-bezier(.22,1,.36,1), border-color .35s, box-shadow .35s";
      };
      card.addEventListener("mousemove", move as EventListener);
      card.addEventListener("mouseleave", leave);
      handlers.push({ el: card, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move as EventListener);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section className="features-section" aria-labelledby="featTitle">
      <div className="reveal">
        <div className="section-eyebrow">Core Capabilities</div>
        <h2 className="section-title" id="featTitle">
          Built for <span className="blue">cloud-native compliance</span>
        </h2>
        <p className="section-sub">
          Agentic, AI-powered workflows that continuously enforce your security posture — across every region, every cloud, every resource.
        </p>
      </div>

      <div className="feat-grid">
        {features.map((f) => (
          <div key={f.name} className={`feat-card ${f.colorClass} reveal ${f.delay}`}>
            <div className={`feat-icon ${f.iconClass}`}>{f.icon}</div>
            <div className="feat-name">{f.name}</div>
            <p className="feat-desc">{f.desc}</p>
            <a href="#" className="feat-link">
              Learn more
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
