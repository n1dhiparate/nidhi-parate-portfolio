import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Flower } from "./Flower";
import hills from "../../assets/hill-background.png";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Sky drifts subtly, sun lowers, hills shift hue
  const sunY = useTransform(scrollYProgress, [0, 1], ["10%", "55%"]);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.9, 0.7, 0.4]);
  const cloud1X = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const cloud2X = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const hillShift = 0;
type FlowerType = "white" ;
const raw: {
  x: number;
  size: number;
  baseY: number;
  flower: FlowerType;
  rotation: number;
  flip?: boolean;
}[] = [
  { x: -3.4, size: 380, baseY: -35, flower: "white", rotation: 11.5, flip: false },

  { x: 95, size: 400, baseY: -25, flower: "white", rotation: 38 },
];

const flowers = raw.map((f) => ({
  ...f,
  start: 0,
  end: 0.9,
}));
    

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
      {/* Flickering Grid */}
<FlickeringGrid
  className="absolute inset-0 z-20"
  width={1920}
  height={1080}
  squareSize={8}
  gridGap={12}
  color="white"
  maxOpacity={0.45}
  flickerChance={0.2}
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

      {/* Hills */}
<motion.div
  className="absolute inset-x-0 bottom-0 z-10"
  style={{ y: hillShift }}
>
  <motion.img
    src={hills}
    alt=""
    className="absolute bottom-0 w-full h-auto"
  />
</motion.div>

      {/* Flowers — placed within the hill region */}
      <div className="absolute inset-x-0 bottom-0 h-[60vh] z-30">
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
