import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Flower } from "./Flower";

export function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Sky drifts subtly, sun lowers, hills shift hue
  const sunY = useTransform(scrollYProgress, [0, 1], ["10%", "55%"]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.9, 0.7, 0.4]);
  const cloud1X = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cloud2X = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const hillShift = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // 24 flowers placed across the hills, each blooming in its own scroll window
  const flowers = [
    { x: 5, baseY: 60, size: 90, hue: 350, start: 0.05, end: 0.25, variant: "daisy" as const },
    { x: 14, baseY: 40, size: 110, hue: 20, start: 0.08, end: 0.3, variant: "tulip" as const },
    { x: 22, baseY: 70, size: 80, hue: 320, start: 0.12, end: 0.32, variant: "bell" as const },
    { x: 30, baseY: 50, size: 100, hue: 280, start: 0.15, end: 0.38, variant: "daisy" as const },
    { x: 38, baseY: 80, size: 95, hue: 60, start: 0.18, end: 0.4, variant: "tulip" as const },
    { x: 46, baseY: 45, size: 120, hue: 340, start: 0.2, end: 0.45, variant: "daisy" as const },
    { x: 54, baseY: 65, size: 85, hue: 200, start: 0.22, end: 0.45, variant: "bell" as const },
    { x: 62, baseY: 55, size: 110, hue: 10, start: 0.25, end: 0.5, variant: "tulip" as const },
    { x: 70, baseY: 75, size: 95, hue: 300, start: 0.28, end: 0.52, variant: "daisy" as const },
    { x: 78, baseY: 50, size: 100, hue: 50, start: 0.3, end: 0.55, variant: "tulip" as const },
    { x: 86, baseY: 65, size: 90, hue: 330, start: 0.32, end: 0.58, variant: "bell" as const },
    { x: 94, baseY: 45, size: 105, hue: 270, start: 0.35, end: 0.6, variant: "daisy" as const },
    // Second wave - mid/late bloom
    { x: 10, baseY: 110, size: 70, hue: 340, start: 0.4, end: 0.65, variant: "bell" as const },
    { x: 26, baseY: 130, size: 75, hue: 30, start: 0.45, end: 0.7, variant: "daisy" as const },
    { x: 42, baseY: 115, size: 80, hue: 310, start: 0.5, end: 0.72, variant: "tulip" as const },
    { x: 58, baseY: 135, size: 70, hue: 70, start: 0.52, end: 0.75, variant: "daisy" as const },
    { x: 74, baseY: 120, size: 78, hue: 350, start: 0.55, end: 0.78, variant: "bell" as const },
    { x: 90, baseY: 140, size: 72, hue: 20, start: 0.58, end: 0.8, variant: "tulip" as const },
    // Final foreground burst
    { x: 18, baseY: 20, size: 130, hue: 340, start: 0.7, end: 0.9, variant: "daisy" as const },
    { x: 50, baseY: 15, size: 150, hue: 20, start: 0.75, end: 0.95, variant: "tulip" as const },
    { x: 82, baseY: 25, size: 135, hue: 300, start: 0.78, end: 0.98, variant: "daisy" as const },
    { x: 35, baseY: 30, size: 110, hue: 60, start: 0.8, end: 1, variant: "bell" as const },
    { x: 66, baseY: 35, size: 115, hue: 200, start: 0.82, end: 1, variant: "tulip" as const },
    { x: 5, baseY: 10, size: 90, hue: 350, start: 0.85, end: 1, variant: "daisy" as const },
  ];

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* Sky gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.94 0.05 235) 0%, oklch(0.86 0.1 220) 45%, oklch(0.78 0.12 200) 75%, oklch(0.7 0.14 185) 100%)",
        }}
      />

      {/* Sun */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: sunY,
          width: 280,
          height: 280,
          opacity: sunOpacity,
          background:
            "radial-gradient(circle, oklch(0.98 0.08 90 / 0.9) 0%, oklch(0.94 0.12 70 / 0.4) 40%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />

      {/* Clouds */}
      <motion.div
        className="absolute top-[8%] left-[10%]"
        style={{ x: cloud1X }}
      >
        <Cloud width={320} />
      </motion.div>
      <motion.div
        className="absolute top-[22%] right-[5%]"
        style={{ x: cloud2X }}
      >
        <Cloud width={240} />
      </motion.div>
      <motion.div
        className="absolute top-[14%] left-[55%]"
        style={{ x: cloud1X }}
      >
        <Cloud width={180} />
      </motion.div>

      {/* Hills */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ y: hillShift }}
      >
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          className="w-full h-[70vh]"
        >
          {/* Back hill */}
          <path
            d="M 0 400 Q 360 220 720 320 T 1440 280 L 1440 600 L 0 600 Z"
            fill="oklch(0.78 0.1 155 / 0.85)"
          />
          {/* Mid hill */}
          <path
            d="M 0 460 Q 240 360 540 420 T 1080 400 T 1440 440 L 1440 600 L 0 600 Z"
            fill="oklch(0.7 0.13 150 / 0.9)"
          />
          {/* Front hill */}
          <path
            d="M 0 540 Q 360 460 720 500 T 1440 520 L 1440 600 L 0 600 Z"
            fill="oklch(0.55 0.14 150)"
          />
        </svg>
      </motion.div>

      {/* Flowers — placed within the hill region */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh]">
        {flowers.map((f, i) => (
          <Flower key={i} progress={scrollYProgress} {...f} />
        ))}
      </div>

      {/* Atmospheric haze */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.95 0.05 200 / 0.4) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}

function Cloud({ width }: { width: number }) {
  return (
    <svg viewBox="0 0 200 80" width={width} height={width * 0.4} style={{ opacity: 0.85 }}>
      <defs>
        <radialGradient id={`cg-${width}`} cx="50%" cy="40%">
          <stop offset="0%" stopColor="oklch(1 0 0 / 0.95)" />
          <stop offset="100%" stopColor="oklch(1 0 0 / 0.4)" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="50" rx="50" ry="22" fill={`url(#cg-${width})`} />
      <ellipse cx="110" cy="40" rx="45" ry="28" fill={`url(#cg-${width})`} />
      <ellipse cx="150" cy="50" rx="40" ry="20" fill={`url(#cg-${width})`} />
    </svg>
  );
}
