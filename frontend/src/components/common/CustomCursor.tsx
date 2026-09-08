import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const spotlightPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable custom cursor animations on devices with precise pointer (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsPointerFine(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsPointerFine(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable/interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor-interactive]')
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth physics loop for outer follower ring and ambient spotlight
    const renderLoop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Update inner dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      // Smooth lag / interpolation for outer ring (lerp factor 0.18)
      ringPos.current.x += (targetX - ringPos.current.x) * 0.18;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Smooth lag for ambient background spotlight (lerp factor 0.08)
      spotlightPos.current.x += (targetX - spotlightPos.current.x) * 0.08;
      spotlightPos.current.y += (targetY - spotlightPos.current.y) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightPos.current.x}px, ${spotlightPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* 1. Ambient Background Cursor Spotlight (Subtle Interactive Glow) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none z-0 transition-opacity duration-500 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255, 91, 20, 0.09) 0%, rgba(255, 120, 45, 0.03) 45%, transparent 70%)',
          willChange: 'transform'
        }}
      />

      {/* 2. Outer Smooth Follow Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9999] transition-[width,height,background-color,border-color,opacity,transform] duration-200 ease-out ${
          !isVisible
            ? 'opacity-0'
            : isHovered
            ? 'w-11 h-11 bg-[#FF5B14]/15 border-2 border-[#FF5B14] shadow-[0_0_20px_rgba(255,91,20,0.45)] opacity-100 scale-110'
            : isClicked
            ? 'w-6 h-6 bg-[#FF5B14]/25 border border-[#FF782D] opacity-90 scale-90'
            : 'w-8 h-8 bg-transparent border border-white/30 opacity-70'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* 3. Inner Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[10000] transition-[width,height,background-color,opacity] duration-150 ease-out ${
          !isVisible
            ? 'opacity-0'
            : isHovered
            ? 'w-2 h-2 bg-[#FF782D] shadow-[0_0_8px_#FF5B14] opacity-100'
            : isClicked
            ? 'w-2.5 h-2.5 bg-white opacity-100'
            : 'w-1.5 h-1.5 bg-[#FF5B14] opacity-90'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
