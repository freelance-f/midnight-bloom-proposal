import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "spark" | "heart";
  phase: number;
}

const FloatingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        type: "spark",
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Hearts (fewer, larger)
    for (let i = 0; i < 8; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 6,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -Math.random() * 0.2 - 0.05,
        opacity: Math.random() * 0.12 + 0.03,
        type: "heart",
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawHeart = (x: number, y: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `hsl(340, 60%, 55%)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      const s = size / 15;
      ctx.moveTo(0, s * 3);
      ctx.bezierCurveTo(-s * 5, -s * 3, -s * 10, s * 2, 0, s * 10);
      ctx.moveTo(0, s * 3);
      ctx.bezierCurveTo(s * 5, -s * 3, s * 10, s * 2, 0, s * 10);
      ctx.stroke();
      ctx.restore();
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(time + p.phase) * 0.15;
        p.y += p.speedY;

        if (p.y < -20) p.y = canvas.height + 20;
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        if (p.type === "spark") {
          const flicker = 0.5 + Math.sin(time * 3 + p.phase) * 0.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(45, 100%, 85%, ${p.opacity * flicker})`;
          ctx.shadowColor = `hsla(45, 100%, 85%, ${p.opacity * flicker * 0.5})`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          drawHeart(p.x, p.y, p.size, p.opacity);
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default FloatingParticles;
