import { useEffect, useRef } from "react";

export default function FlourParticles() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    const PARTICLE_COUNT = 60;
    const createParticle = (randomY = true) => ({
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvas.height : canvas.height + Math.random() * 40,
      size: 2 + Math.random() * 4,
      speedY: 0.2 + Math.random() * 0.6,
      swaySpeed: 0.3 + Math.random() * 0.7,
      swayOffset: Math.random() * Math.PI * 2,
      opacity: 0.1 + Math.random() * 0.3,
    });

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => createParticle(true));

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      particlesRef.current.forEach((p) => {
        p.y -= p.speedY;
        const swayX = Math.sin(time * p.swaySpeed + p.swayOffset) * 0.8;
        p.x += swayX;

        // Reset when out of view
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 249, 243, ${p.opacity})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
