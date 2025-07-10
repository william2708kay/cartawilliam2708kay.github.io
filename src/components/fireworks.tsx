"use client";

import React from 'react';

const Firework = ({ style }: { style: React.CSSProperties }) => (
  <div className="firework" style={style}></div>
);

export const Fireworks = () => {
  const fireworks = Array.from({ length: 20 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animation: `firework-animation ${Math.random() * 1.2 + 0.8}s ${Math.random() * 2.5}s infinite`,
      transform: `scale(${Math.random() * 0.5 + 0.5})`,
      backgroundColor: `hsl(${Math.random() * 60 + 320}, 90%, 80%)`,
    };
    return <Firework key={i} style={style} />;
  });

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-50">{fireworks}</div>;
};
