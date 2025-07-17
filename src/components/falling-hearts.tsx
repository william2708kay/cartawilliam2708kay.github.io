"use client";

import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const FallingHeart = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="absolute text-red-500"
    style={{
      ...style,
      animationName: 'heart-fall',
      animationTimingFunction: 'linear',
      animationIterationCount: 'infinite',
    }}
  >
    <Heart fill="currentColor" className="w-full h-full" />
  </div>
);

export const FallingHearts = () => {
  const [hearts, setHearts] = useState<JSX.Element[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const generatedHearts = Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 24 + 12; // Random size from 12px to 36px
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${Math.random() * 5 + 5}s`, // 5s to 10s duration
        animationDelay: `${Math.random() * 7}s`,
      };
      return <FallingHeart key={i} style={style} />;
    });
    setHearts(generatedHearts);
  }, [isMounted]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {hearts}
    </div>
  );
};
