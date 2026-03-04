import { useEffect, useRef } from "react";

interface Neuron {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  c: string;
  flashTimer: number;
  flashDuration: number;
  isFlashing: boolean;
}

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
    const N = Math.min(100, Math.floor(window.innerWidth / 16));

    const neurons: Neuron[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.6 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.4 + 0.05,
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      flashTimer: Math.random() * 600,
      flashDuration: 30 + Math.random() * 40,
      isFlashing: false,
    }));

    const isLight = () => document.documentElement.getAttribute("data-theme") === "light";

    // Draw subtle grid lines on canvas
    const drawGrid = (light: boolean) => {
      const gridSize = 60;
      const gridAlpha = light ? 0.025 : 0.015;
      ctx.strokeStyle = `rgba(59,130,246,${gridAlpha})`;
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
    };

    // Draw neuron connections with flash propagation
    const drawConnections = (light: boolean) => {
      const maxDist = 150;
      const baseAlpha = light ? 0.04 : 0.025;

      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            let alpha = proximity * baseAlpha;

            // Brighten connection if either neuron is flashing
            const eitherFlashing = neurons[i].isFlashing || neurons[j].isFlashing;
            if (eitherFlashing) {
              const flashIntensity = light ? 0.18 : 0.12;
              alpha = proximity * flashIntensity;

              // Draw a bright flash pulse along the connection
              const grad = ctx.createLinearGradient(
                neurons[i].x, neurons[i].y,
                neurons[j].x, neurons[j].y
              );
              const flashColor = neurons[i].isFlashing ? neurons[i].c : neurons[j].c;
              grad.addColorStop(0, flashColor + (proximity * (light ? 0.25 : 0.18)) + ")");
              grad.addColorStop(0.5, flashColor + (proximity * (light ? 0.35 : 0.25)) + ")");
              grad.addColorStop(1, flashColor + (proximity * (light ? 0.25 : 0.18)) + ")");

              ctx.beginPath();
              ctx.strokeStyle = grad;
              ctx.lineWidth = 1.2;
              ctx.moveTo(neurons[i].x, neurons[i].y);
              ctx.lineTo(neurons[j].x, neurons[j].y);
              ctx.stroke();

              // Trigger flash in connected neuron (propagation)
              if (neurons[i].isFlashing && !neurons[j].isFlashing && dist < 100) {
                neurons[j].flashTimer = Math.max(neurons[j].flashTimer, neurons[j].flashDuration - 8);
              }
              if (neurons[j].isFlashing && !neurons[i].isFlashing && dist < 100) {
                neurons[i].flashTimer = Math.max(neurons[i].flashTimer, neurons[i].flashDuration - 8);
              }
            } else {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
              ctx.lineWidth = 0.4;
              ctx.moveTo(neurons[i].x, neurons[i].y);
              ctx.lineTo(neurons[j].x, neurons[j].y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const light = isLight();
      const alphaScale = light ? 0.4 : 0.7;

      // Draw grid first (very subtle)
      drawGrid(light);

      // Update and draw neurons
      neurons.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) n.x = W;
        if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H;
        if (n.y > H) n.y = 0;

        // Flash logic
        n.flashTimer++;
        if (n.flashTimer >= n.flashDuration) {
          n.isFlashing = true;
          if (n.flashTimer >= n.flashDuration + 20) {
            n.isFlashing = false;
            n.flashTimer = 0;
            n.flashDuration = 200 + Math.random() * 400;
          }
        }

        // Draw neuron node
        const flashGlow = n.isFlashing ? 2.5 : 0;
        const nodeAlpha = n.a * alphaScale + (n.isFlashing ? 0.4 : 0);
        const nodeRadius = n.r + flashGlow;

        if (n.isFlashing) {
          // Glow effect
          const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, nodeRadius * 4);
          glowGrad.addColorStop(0, n.c + "0.3)");
          glowGrad.addColorStop(0.5, n.c + "0.08)");
          glowGrad.addColorStop(1, n.c + "0)");
          ctx.beginPath();
          ctx.arc(n.x, n.y, nodeRadius * 4, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.c + nodeAlpha + ")";
        ctx.fill();
      });

      drawConnections(light);
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
