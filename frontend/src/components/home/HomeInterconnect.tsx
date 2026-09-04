import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

type OrbNode = {
  id: string;
  x: number;
  y: number;
  active: boolean;
  accent: string;
};

type FlowLayout = {
  width: number;
  height: number;
  nodes: OrbNode[];
  scrollProgress: number;
  beamY: number;
};

const SECTION_IDS = [
  'hero',
  'build',
  'portfolio',
  'why',
  'architecture',
  'industries',
  'trust',
] as const;

const SECTION_ACCENTS: Record<string, string> = {
  hero: '#FF5B14',
  build: '#FF782D',
  portfolio: '#10B981',
  why: '#8B5CF6',
  architecture: '#38BDF8',
  industries: '#F59E0B',
  trust: '#FF5B14',
};

const FLOATING_SYMBOLS = ['♠', '♦', '♣', '♥', '●', '◆'] as const;

function buildFlowPath(nodes: OrbNode[]): string {
  const sorted = [...nodes].sort((a, b) => a.y - b.y);
  if (sorted.length < 2) return '';

  let d = `M ${sorted[0].x} ${sorted[0].y}`;
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function seededOffset(id: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return (Math.abs(hash) % max) - max / 2;
}

export const HomeInterconnect: React.FC<{
  containerRef: React.RefObject<HTMLElement | null>;
}> = ({ containerRef }) => {
  const [layout, setLayout] = useState<FlowLayout>({
    width: 0,
    height: 0,
    nodes: [],
    scrollProgress: 0,
    beamY: 0,
  });
  const rafRef = useRef<number>(0);
  const activeSetRef = useRef<Set<string>>(new Set());
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1);

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const scrollY = window.scrollY;
    const containerTop = container.offsetTop;
    const height = container.offsetHeight;
    const width = container.offsetWidth;

    const nodes: OrbNode[] = [];
    SECTION_IDS.forEach((id, index) => {
      const el = container.querySelector(`[data-home-section="${id}"]`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const y = rect.top + rect.height / 2 - containerRect.top + scrollY - containerTop;
      const side = index % 2 === 0 ? 0.18 : 0.82;
      const x = width * side + seededOffset(id, 40);
      nodes.push({
        id,
        x,
        y,
        active: activeSetRef.current.has(id),
        accent: SECTION_ACCENTS[id] ?? '#FF5B14',
      });
    });

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
    const beamY = scrollProgress * height;

    setLayout({ width, height, nodes, scrollProgress, beamY });
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength() || 1);
    }
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.homeSection;
          if (!id) continue;
          if (entry.isIntersecting) activeSetRef.current.add(id);
          else activeSetRef.current.delete(id);
        }
        measure();
      },
      { threshold: 0.25, rootMargin: '-15% 0px -15% 0px' },
    );

    for (const id of SECTION_IDS) {
      const el = container.querySelector(`[data-home-section="${id}"]`);
      if (el) observer.observe(el);
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(onScroll);
    resizeObserver.observe(container);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [containerRef, measure]);

  const { width, height, nodes, scrollProgress, beamY } = layout;
  const flowPath = useMemo(() => buildFlowPath(nodes), [nodes]);
  const dashOffset = pathLength * (1 - scrollProgress);

  const particles = useMemo(
    () =>
      FLOATING_SYMBOLS.map((symbol, i) => ({
        symbol,
        left: `${12 + (i * 14) % 76}%`,
        top: `${8 + i * 14}%`,
        delay: `${i * 0.7}s`,
        duration: `${5 + (i % 3) * 1.5}s`,
      })),
    [],
  );

  if (width < 1 || height < 1 || nodes.length < 2) return null;

  return (
    <div aria-hidden className="pointer-events-none select-none absolute inset-0 z-[5] overflow-hidden hidden md:block">
      {/* Scroll-following ambient beam */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[min(90vw,700px)] h-[420px] rounded-full blur-[120px] transition-[top] duration-300 ease-out home-flow-beam"
        style={{
          top: beamY - 180,
          background:
            'radial-gradient(ellipse, rgba(255,91,20,0.14) 0%, rgba(139,92,246,0.06) 45%, transparent 72%)',
        }}
      />

      {/* Drifting suit particles */}
      {particles.map((p) => (
        <span
          key={p.symbol + p.left}
          className="absolute text-sm sm:text-base home-flow-drift opacity-[0.07]"
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
            color: p.symbol === '♥' || p.symbol === '♦' ? '#f87171' : '#fff',
          }}
        >
          {p.symbol}
        </span>
      ))}

      <svg
        className="absolute inset-0 w-full h-full"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF5B14" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#FF782D" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#10B981" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.35" />
          </linearGradient>
          <filter id="flow-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ghost trail */}
        <path
          ref={pathRef}
          d={flowPath}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Animated flowing ribbon */}
        <path
          d={flowPath}
          fill="none"
          stroke="url(#flow-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${pathLength * 0.12} ${pathLength * 0.88}`}
          className="home-flow-ribbon"
          filter="url(#flow-soft-glow)"
        />

        {/* Scroll-revealed path */}
        <path
          d={flowPath}
          fill="none"
          stroke="url(#flow-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          opacity="0.85"
          className="transition-[stroke-dashoffset] duration-200 ease-out"
        />

        {/* Section orbs + soft links */}
        {nodes.map((node, i) => {
          const isActive = node.active;
          const r = isActive ? 14 : 8;
          const glowR = isActive ? 48 : 28;

          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={glowR}
                fill={node.accent}
                opacity={isActive ? 0.12 : 0.04}
                className="transition-all duration-700"
              />

              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={isActive ? `${node.accent}33` : 'rgba(255,255,255,0.04)'}
                stroke={isActive ? node.accent : 'rgba(255,255,255,0.12)'}
                strokeWidth={isActive ? 2 : 1}
                className="transition-all duration-500"
              />

              {isActive && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r + 6}
                  fill="none"
                  stroke={node.accent}
                  strokeWidth="1"
                  opacity="0.35"
                  className="home-flow-ripple"
                />
              )}

              {/* Energy dot traveling toward next node */}
              {isActive && i < nodes.length - 1 && (
                <circle r="3.5" fill={node.accent} opacity="0.9" filter="url(#flow-soft-glow)">
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    path={buildFlowPath(nodes.slice(i, i + 2))}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
