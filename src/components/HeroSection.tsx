import { useEffect, useRef } from "react";
import DashboardCard from "./DashboardCard";

const HeroSection = () => {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = ((e.clientY - cy) / cy) * -6;
      const ry = ((e.clientX - cx) / cx) * 8;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.transition = "none";
    };
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
      el.style.transition = "transform .8s cubic-bezier(.22,1,.36,1)";
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="heroTitle">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" aria-hidden="true" />
          Global AI-based SaaS for multi-cloud compliance
        </div>

        <h1 className="hero-title" id="heroTitle">
          <span className="t-white">Enterprise-Grade</span>
          <span className="t-blue">Multi-Cloud</span>
          <span className="t-dim">Compliance Automation</span>
        </h1>

        <p className="hero-body">
          Automate audits, detect threats in real time, and continuously enforce controls across <strong>AWS</strong>, <strong>Azure</strong>, and <strong>GCP</strong>.
        </p>
        <p className="hero-body">
          Built with Generative AI and agentic workflows to reduce operational overhead, improve control visibility, and keep you audit-ready.
        </p>

        <div className="chip-row">
          <span className="chip aws">AWS</span>
          <span className="chip azure">Azure</span>
          <span className="chip gcp">GCP</span>
          <span className="chip k8s">Kubernetes</span>
        </div>

        <div className="hero-ctas">
          <a href="#" className="btn btn-blue btn-lg">
            <span className="btn-shine" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 3l14 9-14 9V3z" /></svg>
            Start Free Trial
          </a>
          <a href="#" className="btn btn-orange btn-lg">
            <span className="btn-shine" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            Book a Demo
          </a>
        </div>

        <p className="hero-disclaimer">
          No sales pressure<span>•</span>Secure &amp; confidential<span>•</span>Designed for regulated environments
        </p>

        <div className="hero-stats">
          <div className="stat-glass">
            <div className="stat-num">60%</div>
            <div className="stat-lbl">Audit Effort Reduction</div>
          </div>
          <div className="stat-glass">
            <div className="stat-num">24/7</div>
            <div className="stat-lbl">Continuous Monitoring</div>
          </div>
          <div className="stat-glass">
            <div className="stat-num">99.9%</div>
            <div className="stat-lbl">Uptime</div>
          </div>
        </div>
      </div>

      <div className="hero-visual" ref={visualRef} aria-hidden="true">
        <div className="live-badge">
          <span className="live-dot" />
          Live Monitoring
        </div>
        <DashboardCard />
      </div>
    </section>
  );
};

export default HeroSection;
