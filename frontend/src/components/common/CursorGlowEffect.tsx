import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export const CursorGlowEffect: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // References for mouse coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useRef<Particle[]>([]);
  const lastEmitTime = useRef(0);
  const animFrameId = useRef<number | null>(null);

  const colors = ['#FF5B14', '#FF782D', '#F59E0B', '#38BDF8', '#FFA07A'];

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;
    setIsPointerDevice(true);

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Spawn particles on cursor movement (throttled ~25ms)
      const now = performance.now();
      if (now - lastEmitTime.current > 25 && particles.current.length < 50) {
        lastEmitTime.current = now;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.3;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.2, // slight gravity
          size: Math.random() * 3 + 1.5,
          color,
          alpha: 0.8,
          decay: Math.random() * 0.025 + 0.02,
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      // Mini burst of sparks on click
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
        const speed = Math.random() * 2.5 + 1.2;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.035,
        });
      }
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hover on buttons and clickable links
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      setIsHovered(!!interactiveEl);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth animation loop (60 FPS)
    const render = () => {
      // 1. Lerp cursor ring position (Smooth physics follow)
      const ringSpeed = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ringSpeed;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ringSpeed;

      // 2. Lerp ambient spotlight position (Floating fluid effect)
      const glowSpeed = 0.08;
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * glowSpeed;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * glowSpeed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 3. Render Canvas particle trail
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* 1. Canvas Particle Sparkle Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997] transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* 2. Soft Ambient Cursor Spotlight Glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1] transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(255, 91, 20, 0.12) 0%, rgba(245, 158, 11, 0.05) 40%, rgba(7, 9, 14, 0) 70%)',
          opacity: isVisible ? 1 : 0,
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />

      {/* 3. Outer Magnetic Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-[width,height,background-color,border-color,opacity] duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-12 h-12 bg-[#FF5B14]/15 border-2 border-[#FF782D] shadow-[0_0_25px_rgba(255,91,20,0.5)] scale-110'
            : isClicked
            ? 'w-7 h-7 bg-[#FF5B14]/25 border border-[#FF5B14] scale-90'
            : 'w-9 h-9 bg-white/[0.02] border border-[#FF5B14]/40 shadow-[0_0_15px_rgba(255,91,20,0.2)]'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      >
        {isHovered && (
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF782D] animate-ping" />
        )}
      </div>

      {/* 4. Precision Center Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-[transform,width,height,opacity] duration-75 ${
          isHovered
            ? 'w-2 h-2 bg-white shadow-[0_0_10px_#FFFFFF]'
            : isClicked
            ? 'w-3 h-3 bg-[#FF782D] shadow-[0_0_15px_#FF782D]'
            : 'w-2 h-2 bg-[#FF5B14] shadow-[0_0_10px_#FF5B14]'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      />
    </>
  );
};
