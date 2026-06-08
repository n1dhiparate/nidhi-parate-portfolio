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
  // Flowers are distributed across the full scroll, each blooming in a
  // generous overlapping window so the garden grows in continuous waves
  // rather than discrete bursts. Window length ≈ 0.35 of total scroll.
  const variants = ["daisy", "tulip", "bell", "daisy", "tulip", "bell"] as const;
  const hues = [350, 20, 320, 280, 60, 200, 10, 300, 50, 330, 270, 340];

  const raw = [
    // Back layer — distant, smaller, gentle hues, start earliest
    { x: 6,  baseY: 60,  size: 88,  layer: 0 },
    { x: 15, baseY: 42,  size: 108, layer: 0 },
    { x: 24, baseY: 70,  size: 80,  layer: 0 },
    { x: 33, baseY: 50,  size: 100, layer: 0 },
    { x: 42, baseY: 78,  size: 92,  layer: 0 },
    { x: 51, baseY: 46,  size: 118, layer: 0 },
    { x: 60, baseY: 64,  size: 86,  layer: 0 },
    { x: 69, baseY: 54,  size: 108, layer: 0 },
    { x: 78, baseY: 74,  size: 94,  layer: 0 },
    { x: 87, baseY: 50,  size: 100, layer: 0 },
    { x: 94, baseY: 66,  size: 90,  layer: 0 },
    // Mid layer
    { x: 10, baseY: 112, size: 74,  layer: 1 },
    { x: 22, baseY: 128, size: 78,  layer: 1 },
    { x: 36, baseY: 116, size: 82,  layer: 1 },
    { x: 48, baseY: 134, size: 72,  layer: 1 },
    { x: 60, baseY: 120, size: 80,  layer: 1 },
    { x: 74, baseY: 132, size: 76,  layer: 1 },
    { x: 88, baseY: 118, size: 80,  layer: 1 },
    // Foreground — biggest, latest, most saturated
    { x: 8,  baseY: 18,  size: 128, layer: 2 },
    { x: 28, baseY: 28,  size: 118, layer: 2 },
    { x: 46, baseY: 14,  size: 150, layer: 2 },
    { x: 64, baseY: 32,  size: 122, layer: 2 },
    { x: 82, baseY: 22,  size: 138, layer: 2 },
    { x: 96, baseY: 28,  size: 110, layer: 2 },
  ];

  // Distribute each flower's bloom window across the full scroll based on
  // its layer (back blooms first, foreground last) with a soft horizontal
  // sweep so waves move left-to-right within each layer.
  const flowers = raw.map((f, i) => {
    const layerStart = [0.02, 0.18, 0.36][f.layer];
    const layerEnd   = [0.78, 0.90, 1.00][f.layer];
    const layerCount = raw.filter((r) => r.layer === f.layer).length;
    const indexInLayer = raw.filter((r, j) => r.layer === f.layer && j <= i).length - 1;
    // Stagger by index AND by horizontal position for a sweeping wave
    const stagger = (indexInLayer / Math.max(1, layerCount - 1)) * 0.55
                  + (f.x / 100) * 0.15;
    const windowLen = 0.32;
    const start = layerStart + stagger * (layerEnd - layerStart - windowLen);
    const end = Math.min(1, start + windowLen);
    return {
      ...f,
      hue: hues[i % hues.length],
      variant: variants[i % variants.length],
      start,
      end,
    };
  });


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
