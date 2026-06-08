import { motion, useTransform, useSpring, type MotionValue } from "motion/react";

interface FlowerProps {
  progress: MotionValue<number>;
  x: number;
  baseY: number;
  size?: number;
  hue?: number;
  start: number;
  end: number;
  variant?: "tulip" | "daisy" | "bell";
}

// Cubic ease-in-out for organic motion
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Build a smooth multi-stop curve through an easing function
function buildEased(start: number, end: number, steps = 12) {
  const input: number[] = [];
  const output: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    input.push(start + (end - start) * t);
    output.push(easeOut(t));
  }
  return { input, output };
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
  // Smooth the raw scroll progress with a spring — makes every derived
  // animation feel like the garden is breathing, not snapping to scroll.
  const smooth = useSpring(progress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const span = end - start;

  // Overlapping phases so growth feels continuous rather than staged:
  // stem 0–55%, bud 35–70%, bloom 55–100%. Each runs through eased curves.
  const stemPhase = buildEased(start, start + span * 0.55);
  const budPhase = buildEased(start + span * 0.35, start + span * 0.7);
  const bloomPhase = buildEased(start + span * 0.55, end);

  const stemGrowth = useTransform(smooth, stemPhase.input, stemPhase.output);
  const stemOpacity = useTransform(
    smooth,
    [start, start + span * 0.15, end],
    [0, 1, 1]
  );
  const budScale = useTransform(smooth, budPhase.input, budPhase.output);
  const budOpacity = useTransform(
    smooth,
    [start + span * 0.35, start + span * 0.55, start + span * 0.75],
    [0, 1, 0.6]
  );
  const bloomScale = useTransform(smooth, bloomPhase.input, bloomPhase.output);
  const bloomRotate = useTransform(
    smooth,
    [start + span * 0.55, end],
    [-18, 0]
  );

  // Gentle, continuous sway across the entire window
  const swayInput: number[] = [];
  const swayOutput: number[] = [];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    swayInput.push(start + span * t);
    swayOutput.push(Math.sin(t * Math.PI * 1.4) * 3.2);
  }
  const sway = useTransform(smooth, swayInput, swayOutput);

  const petalColor = `oklch(0.88 0.12 ${hue} / 0.55)`;
  const petalEdge = `oklch(0.78 0.14 ${hue} / 0.9)`;
  const centerColor = `oklch(0.92 0.13 75 / 0.85)`;
  const stemColor = `oklch(0.55 0.14 150 / 0.85)`;
  const gradId = `petal-${Math.round(x * 10)}-${hue}`;

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
          <radialGradient id={gradId} cx="50%" cy="50%">
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
          style={{ pathLength: stemGrowth, opacity: stemOpacity }}
        />
        {/* Leaf */}
        <motion.path
          d="M 50 160 Q 30 150 25 165 Q 35 170 50 165 Z"
          fill={stemColor}
          style={{ scale: stemGrowth, transformOrigin: "50px 160px", opacity: stemOpacity }}
        />

        {/* Bud */}
        <motion.g style={{ scale: budScale, opacity: budOpacity, transformOrigin: "50px 80px" }}>
          <ellipse cx="50" cy="78" rx="6" ry="9" fill={petalEdge} opacity="0.75" />
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
                    fill={`url(#${gradId})`}
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
                fill={`url(#${gradId})`}
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
                  fill={`url(#${gradId})`}
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

// Helper for callers to keep ease export usable if needed elsewhere
export { ease };
