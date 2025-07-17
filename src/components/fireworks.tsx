"use client";

import React, { useState, useEffect } from 'react';

const Firework = ({ style }: { style: React.CSSProperties }) => (
  <div className="firework" style={style}></div>
);

export const Fireworks = () => {
  const [fireworks, setFireworks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generatedFireworks = Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 0.8 + 0.8; // Random size from 0.8 to 1.6
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `firework-animation ${Math.random() * 1.2 + 0.8}s ${Math.random() * 3}s infinite`,
        transform: `scale(${size})`,
        color: `hsl(${Math.random() * 40 + 320}, 90%, 70%)` // Hues for pinks/purples
      };
      return <Firework key={i} style={style} />;
    });
    setFireworks(generatedFireworks);
  }, []);

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-50">{fireworks}</div>;
};
