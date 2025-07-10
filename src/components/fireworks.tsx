"use client";

import React from 'react';

const Firework = ({ style }: { style: React.CSSProperties }) => (
  <div className="firework" style={style}></div>
);

export const Fireworks = () => {
  const fireworks = Array.from({ length: 15 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      // Slower animation, longer delay
      animation: `firework-animation ${Math.random() * 1.5 + 1}s ${Math.random() * 5 + 2}s infinite`,
      transform: `scale(${Math.random() * 0.5 + 0.5})`,
      // Hue values for pinks (approx 320 to 350)
      backgroundColor: `hsl(${Math.random() * 30 + 320}, 90%, 80%)`,
    };
    return <Firework key={i} style={style} />;
  });

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-50">{fireworks}</div>;
};
