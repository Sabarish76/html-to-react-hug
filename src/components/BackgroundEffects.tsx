import { useEffect, useRef } from "react";

const BackgroundEffects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number;
    let raf: number;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const COLORS = ["rgba(59,130,246,", "rgba(34,211,238,", "rgba(139,92,246,"];
    const N = Math.min(80, Math.floor(window.innerWidth / 20));

    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.6 + 0.1,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";

    const drawConnections = () => {
      const light = isLight();
      const maxAlpha = light ? 0.14 : 0.08;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / 130) * maxAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const light = isLight();
      const alphaScale = light ? 0.55 : 1;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c + p.a * alphaScale + ")";
        ctx.fill();
      });
      drawConnections();
      raf = requestAnimationFrame(tick);
    };
    tick();

    // Orb shimmer
    const orbInterval = setInterval(() => {
      document.querySelectorAll(".glow-orb").forEach((orb) => {
        (orb as HTMLElement).style.opacity = (0.85 + Math.random() * 0.15).toFixed(2);
      });
    }, 3000);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      clearInterval(orbInterval);
    };
  }, []);

  return (
    <>
      <div className="glow-orb g1" aria-hidden="true" />
      <div className="glow-orb g2" aria-hidden="true" />
      <div className="glow-orb g3" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <canvas ref={canvasRef} id="bgCanvas" aria-hidden="true" />
    </>
  );
};

export default BackgroundEffects;
