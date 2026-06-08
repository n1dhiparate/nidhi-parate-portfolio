import { motion, useTransform, type MotionValue } from "motion/react";

interface FlowerProps {
  progress: MotionValue<number>;
  x: number; // percentage 0-100 horizontal position
  baseY: number; // px from bottom (above hill line)
  size?: number;
  hue?: number; // 0-360
  start: number; // 0-1 scroll progress when growth starts
  end: number; // 0-1 scroll progress when fully bloomed
  delay?: number;
  variant?: "tulip" | "daisy" | "bell";
}

export function Flower({
  progress,
  x,
  baseY,
  size = 120,
  hue = 340,
  start,
  end,
  variant = "daisy",
}: FlowerProps) {
  const span = end - start;
  // Phases: stem (0-50%), bud (40-65%), bloom (60-100%)
  const stemGrowth = useTransform(progress, [start, start + span * 0.5], [0, 1]);
  const budScale = useTransform(progress, [start + span * 0.4, start + span * 0.65], [0, 1]);
  const bloomScale = useTransform(progress, [start + span * 0.6, end], [0, 1]);
  const bloomRotate = useTransform(progress, [start + span * 0.6, end], [-30, 0]);
  const sway = useTransform(progress, [start, end], [0, 4]);

  const petalColor = `oklch(0.88 0.12 ${hue} / 0.55)`;
  const petalEdge = `oklch(0.78 0.14 ${hue} / 0.9)`;
  const centerColor = `oklch(0.92 0.13 75 / 0.85)`;
  const stemColor = `oklch(0.55 0.14 150 / 0.85)`;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${x}%`,
        bottom: `${baseY}px`,
        width: size,
        height: size * 2.2,
        transformOrigin: "bottom center",
        pointerEvents: "none",
        rotate: sway,
      }}
    >
      <svg viewBox="0 0 100 220" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <radialGradient id={`petal-${x}-${hue}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor={`oklch(0.96 0.08 ${hue} / 0.7)`} />
            <stop offset="70%" stopColor={petalColor} />
            <stop offset="100%" stopColor={petalEdge} />
          </radialGradient>
        </defs>

        {/* Stem */}
        <motion.line
          x1="50"
          y1="220"
          x2="50"
          y2="80"
          stroke={stemColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: stemGrowth, opacity: stemGrowth }}
        />
        {/* Leaf */}
        <motion.path
          d="M 50 160 Q 30 150 25 165 Q 35 170 50 165 Z"
          fill={stemColor}
          style={{ scale: stemGrowth, transformOrigin: "50px 160px", opacity: stemGrowth }}
        />

        {/* Bud */}
        <motion.g style={{ scale: budScale, transformOrigin: "50px 80px" }}>
          <ellipse cx="50" cy="78" rx="6" ry="9" fill={petalEdge} opacity="0.7" />
        </motion.g>

        {/* Bloom */}
        <motion.g
          style={{
            scale: bloomScale,
            rotate: bloomRotate,
            transformOrigin: "50px 75px",
          }}
        >
          {variant === "daisy" && (
            <>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 360) / 8;
                return (
                  <ellipse
                    key={i}
                    cx="50"
                    cy="55"
                    rx="9"
                    ry="22"
                    fill={`url(#petal-${x}-${hue})`}
                    stroke={petalEdge}
                    strokeWidth="0.8"
                    transform={`rotate(${angle} 50 75)`}
                  />
                );
              })}
              <circle cx="50" cy="75" r="7" fill={centerColor} stroke={petalEdge} strokeWidth="0.6" />
            </>
          )}
          {variant === "tulip" && (
            <>
              <path
                d="M 50 50 Q 35 60 38 80 Q 50 90 62 80 Q 65 60 50 50 Z"
                fill={`url(#petal-${x}-${hue})`}
                stroke={petalEdge}
                strokeWidth="0.8"
              />
              <path
                d="M 50 52 Q 42 65 50 82 Q 58 65 50 52 Z"
                fill={petalColor}
                opacity="0.7"
              />
            </>
          )}
          {variant === "bell" && (
            <>
              {[-20, 0, 20].map((a, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="55"
                  rx="7"
                  ry="14"
                  fill={`url(#petal-${x}-${hue})`}
                  stroke={petalEdge}
                  strokeWidth="0.7"
                  transform={`rotate(${a} 50 75)`}
                />
              ))}
              <circle cx="50" cy="75" r="4" fill={centerColor} />
            </>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
