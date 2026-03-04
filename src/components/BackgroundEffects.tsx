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

    // Fewer, evenly distributed nodes for a clean look
    const N = Math.min(50, Math.floor((W * H) / 30000));
    const CONNECTION_DIST = 180;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      pulsePhase: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
    }));

    const isLight = () =>
      document.documentElement.getAttribute("data-theme") === "light";

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const light = isLight();

      // Subtle grid
      const gridSize = 80;
      ctx.strokeStyle = light
        ? "rgba(59,130,246,0.03)"
        : "rgba(59,130,246,0.018)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Update positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
        n.pulsePhase += n.pulseSpeed;
      });

      // Draw connections first (behind nodes)
      const baseLineAlpha = light ? 0.06 : 0.04;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const t = 1 - dist / CONNECTION_DIST;
            const alpha = t * t * baseLineAlpha;
            ctx.beginPath();
            ctx.strokeStyle = light
              ? `rgba(59,130,246,${alpha})`
              : `rgba(100,170,255,${alpha})`;
            ctx.lineWidth = t * 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes — clean small dots with gentle pulse
      nodes.forEach((n) => {
        const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase);
        const radius = 1.2 + pulse * 0.6;
        const alpha = light ? 0.12 + pulse * 0.08 : 0.1 + pulse * 0.1;

        // Soft glow
        const glowRadius = radius * 6;
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
        const glowAlpha = light ? 0.02 + pulse * 0.02 : 0.025 + pulse * 0.025;
        glow.addColorStop(0, `rgba(59,130,246,${glowAlpha * 2})`);
        glow.addColorStop(1, "rgba(59,130,246,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = light
          ? `rgba(59,130,246,${alpha})`
          : `rgba(140,180,255,${alpha})`;
        ctx.fill();
      });

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
      <canvas ref={canvasRef} id="bgCanvas" aria-hidden="true" />
    </>
  );
};

export default BackgroundEffects;
