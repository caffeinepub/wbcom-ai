import { useRef, useState } from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "amber" | "none";
}

const GLOW_SHADOWS: Record<string, string> = {
  cyan: "0 0 20px oklch(0.75 0.18 200 / 0.6), 0 0 40px oklch(0.75 0.18 200 / 0.3)",
  violet:
    "0 0 20px oklch(0.55 0.22 290 / 0.6), 0 0 40px oklch(0.55 0.22 290 / 0.3)",
  amber:
    "0 0 16px oklch(0.78 0.18 70 / 0.5), 0 0 32px oklch(0.78 0.18 70 / 0.25)",
  none: "none",
};

export function Card3D({
  children,
  className = "",
  glowColor = "cyan",
}: Card3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    willChange: "transform",
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const tiltX = -(dy / (rect.height / 2)) * 12;
    const tiltY = (dx / (rect.width / 2)) * 12;
    setStyle({
      transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`,
      transition: "transform 0.08s ease",
      willChange: "transform",
      boxShadow: GLOW_SHADOWS[glowColor] ?? "none",
    });
  }

  function handleMouseLeave() {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.35s ease, box-shadow 0.35s ease",
      willChange: "transform",
      boxShadow: "none",
    });
  }

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
