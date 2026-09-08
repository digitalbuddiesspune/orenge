import React, { useEffect, useRef, useState } from 'react';

interface Point {
  x: number;
  y: number;
  age: number;
  width: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const CursorGlowEffect: React.FC = () => {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // References
  const mousePos = useRef({ x: -100, y: -100 });
  const hudPos = useRef({ x: -100, y: -100 });
  const glowPos = useRef({ x: -100, y: -100 });
  const hudRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Trail history & effects
  const trailPoints = useRef<Point[]>([]);
  const sparks = useRef<Spark[]>([]);
  const shockwaves = useRef<Shockwave[]>([]);
  const animFrameId = useRef<number | null>(null);

  const neonColors = ['#FF5B14', '#FF782D', '#FFB800', '#00F0FF', '#FF0055'];

  useEffect(() => {
    // Only activate on pointer-fine desktop devices
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
      const prevX = mousePos.current.x;
      const prevY = mousePos.current.y;
      const x = e.clientX;
      const y = e.clientY;
      mousePos.current = { x, y };

      if (!isVisible) setIsVisible(true);

      // Add point to smooth fluid ribbon trail
      const dist = Math.hypot(x - prevX, y - prevY);
      const width = Math.min(14, Math.max(3, dist * 0.4));
      trailPoints.current.unshift({ x, y, age: 0, width });

      if (trailPoints.current.length > 22) {
        trailPoints.current.pop();
      }

      // Random micro stardust sparks when moving fast
      if (dist > 8 && Math.random() > 0.4 && sparks.current.length < 40) {
        sparks.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2 - (x - prevX) * 0.1,
          vy: (Math.random() - 0.5) * 2 - (y - prevY) * 0.1,
          size: Math.random() * 2.5 + 1,
          color: neonColors[Math.floor(Math.random() * neonColors.length)],
          alpha: 0.9,
          decay: Math.random() * 0.04 + 0.02,
        });
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);

      // Create expanding shockwave ripple
      shockwaves.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 6,
        maxRadius: 65,
        alpha: 0.9,
        color: '#FF5B14',
      });

      // Spawn click energy burst
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12 + Math.random() * 0.3;
        const speed = Math.random() * 3.5 + 1.5;
        sparks.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.5 + 1.5,
          color: neonColors[Math.floor(Math.random() * neonColors.length)],
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

    // Detect clickable element for HUD Reticle mode
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      if (interactiveEl) {
        setIsHovered(true);
        // Check if button text or action is available
        const aria = interactiveEl.getAttribute('aria-label');
        const text = interactiveEl.textContent?.trim();
        if (aria && aria.length < 15) {
          setHoverText(aria);
        } else if (text && text.length <= 12 && !text.includes('\n')) {
          setHoverText(text);
        } else {
          setHoverText(null);
        }
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Main 60 FPS Render Loop
    const render = () => {
      // 1. Lerp HUD position with smooth spring physics
      const hudSpeed = isHovered ? 0.35 : 0.22;
      hudPos.current.x += (mousePos.current.x - hudPos.current.x) * hudSpeed;
      hudPos.current.y += (mousePos.current.y - hudPos.current.y) * hudSpeed;

      // 2. Lerp Ambient light
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;

      if (hudRef.current) {
        hudRef.current.style.transform = `translate3d(${hudPos.current.x}px, ${hudPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 3. Canvas rendering: Fluid Ribbon + Sparks + Shockwaves
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // A. Draw Shockwaves
        for (let i = shockwaves.current.length - 1; i >= 0; i--) {
          const sw = shockwaves.current[i];
          sw.radius += (sw.maxRadius - sw.radius) * 0.15 + 1.2;
          sw.alpha *= 0.92;

          if (sw.alpha <= 0.02 || sw.radius >= sw.maxRadius) {
            shockwaves.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 91, 20, ${sw.alpha})`;
          ctx.lineWidth = 2.5;
          ctx.shadowBlur = 16;
          ctx.shadowColor = '#FF5B14';
          ctx.stroke();

          // Second thin ring
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, Math.max(0, sw.radius - 8), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${sw.alpha * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }

        // B. Draw Fluid Neon Ribbon Trail
        if (trailPoints.current.length > 2) {
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          for (let i = 0; i < trailPoints.current.length - 1; i++) {
            const p1 = trailPoints.current[i];
            const p2 = trailPoints.current[i + 1];
            p1.age += 1;

            const progress = i / trailPoints.current.length;
            const alpha = (1 - progress) * 0.75;
            const width = Math.max(1.5, p1.width * (1 - progress * 0.8));

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Color gradient along the ribbon
            const r = Math.floor(255 - progress * 40);
            const g = Math.floor(91 + progress * 100);
            const b = Math.floor(20 + progress * 220);

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = width;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#FF5B14';
            ctx.stroke();
          }
          ctx.restore();
        }

        // C. Draw Stardust Sparks
        for (let i = sparks.current.length - 1; i >= 0; i--) {
          const s = sparks.current[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vx *= 0.95;
          s.vy *= 0.95;
          s.alpha -= s.decay;

          if (s.alpha <= 0) {
            sparks.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = s.alpha;
          ctx.fillStyle = s.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
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
  }, [isVisible, isHovered]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* 1. HTML5 Canvas: Dynamic Neon Ribbon + Shockwaves + Sparkle Burst */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997] transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* 2. Soft Ambient Fluid Glow Following Cursor */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[550px] h-[550px] rounded-full pointer-events-none z-[1] transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, rgba(255, 91, 20, 0.14) 0%, rgba(0, 240, 255, 0.04) 40%, rgba(7, 9, 14, 0) 70%)',
          opacity: isVisible ? 1 : 0,
          filter: 'blur(35px)',
          willChange: 'transform',
        }}
      />

      {/* 3. Futuristic Cyber Gaming HUD / Reticle Target Cursor */}
      <div
        ref={hudRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-[width,height,opacity] duration-150 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-14 h-14'
            : isClicked
            ? 'w-6 h-6'
            : 'w-8 h-8'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      >
        {/* State A: Hovered Interactive Target Reticle */}
        {isHovered ? (
          <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-75 duration-150">
            {/* Top-Left Bracket */}
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF5B14] shadow-[0_0_8px_#FF5B14]" />
            {/* Top-Right Bracket */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF5B14] shadow-[0_0_8px_#FF5B14]" />
            {/* Bottom-Left Bracket */}
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF5B14] shadow-[0_0_8px_#FF5B14]" />
            {/* Bottom-Right Bracket */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF5B14] shadow-[0_0_8px_#FF5B14]" />

            {/* Spinning Neon Reticle Circle */}
            <div className="w-9 h-9 rounded-full border border-dashed border-[#00F0FF]/60 animate-spin-slow flex items-center justify-center" />

            {/* Glowing Target Center Dot */}
            <div className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#00F0FF] animate-ping" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#FF782D]" />

            {/* Optional Mini HUD Action Tag */}
            {hoverText && (
              <span className="absolute -bottom-5 px-1.5 py-0.5 rounded bg-black/80 border border-[#FF5B14]/40 text-[9px] font-bold text-[#FF782D] tracking-wider uppercase whitespace-nowrap shadow-md">
                {hoverText}
              </span>
            )}
          </div>
        ) : (
          /* State B: Normal Sleek Cyber Ring + Core Dot */
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Outer Subtle Tech Ring */}
            <div
              className={`rounded-full border transition-all duration-200 ${
                isClicked
                  ? 'w-5 h-5 border-[#00F0FF] bg-[#00F0FF]/20 shadow-[0_0_15px_#00F0FF] scale-90'
                  : 'w-7 h-7 border-[#FF5B14]/50 bg-white/[0.02] shadow-[0_0_10px_rgba(255,91,20,0.25)]'
              }`}
            />
            {/* Center High-Luminance Dot */}
            <div
              className={`absolute rounded-full transition-all duration-100 ${
                isClicked
                  ? 'w-2 h-2 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]'
                  : 'w-1.5 h-1.5 bg-[#FF5B14] shadow-[0_0_8px_#FF5B14]'
              }`}
            />
          </div>
        )}
      </div>
    </>
  );
};
