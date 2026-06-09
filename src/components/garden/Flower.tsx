import { motion, useTransform, useSpring, type MotionValue } from "motion/react";


import whiteFlower from "../../assets/flower-white.png";

interface FlowerProps {
  progress: MotionValue<number>;
  x: number;
  size?: number;
  start: number;
  end: number;
  baseY: number;
  flower:"white" ;
    rotation: number;
}

export function Flower({
  progress,
  x,
  size,
  baseY,
  start,
  end,
  flower,
  rotation,
}: FlowerProps) {

  const smooth = useSpring(progress, {
    stiffness: 80,
    damping: 25,
  });

 const scale = useTransform(
  smooth,
  [start, end],
  [0.6, 1]
);

  const opacity = useTransform(
    smooth,
    [start, end],
    [0, 1]
  );
const y = useTransform(
  smooth,
  [start, end],
  [100, 0]
);
  const flowerMap = {
  
  white: whiteFlower,
  

};

const flowerSrc = whiteFlower;


  return (
    <motion.img
      src={flowerSrc}
      alt=""
      style={{
        position: "absolute",

        left: `${x}%`,
        bottom: `${baseY}px`,

        width: size,

        scale,
        opacity,
        y,
         scaleX: -1,

    rotate: rotation,
        transformOrigin: "bottom center",
      }}
    />
  );
}