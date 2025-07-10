"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LilyIcon } from "@/components/icons/lily-icon";
import { TulipIcon } from "@/components/icons/tulip-icon";

const Petal = ({
  style,
  children,
}: {
  style: React.CSSProperties;
  children: React.ReactNode;
}) => (
  <div
    className="absolute text-accent"
    style={{
      ...style,
      animationName: "fall",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    }}
  >
    {children}
  </div>
);

export function LetterOpener({
  letter,
  openingText,
  buttonText,
}: {
  letter: string;
  openingText: string;
  buttonText: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [petals, setPetals] = useState<
    {
      id: number;
      style: React.CSSProperties;
      icon: JSX.Element;
    }[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      const newPetals = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 8 + 7}s`,
          animationDelay: `${Math.random() * 10}s`,
          transform: `scale(${Math.random() * 0.5 + 0.6})`,
        },
        icon:
          Math.random() > 0.5 ? (
            <LilyIcon className="w-6 h-6" />
          ) : (
            <TulipIcon className="w-6 h-6" />
          ),
      }));
      setPetals(newPetals);
    }
  }, [isOpen]);

  const formattedLetter = useMemo(() => {
    return letter.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  }, [letter]);


  if (!isOpen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 overflow-hidden">
        <div className="relative text-center">
          <LilyIcon className="absolute -top-16 -left-24 h-32 w-32 text-primary opacity-20 -rotate-45 animate-fade-in" />
          <TulipIcon className="absolute -bottom-16 -right-24 h-32 w-32 text-accent opacity-20 rotate-45 animate-fade-in" />
          <h1
            className="text-5xl md:text-7xl font-headline mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {openingText}
          </h1>
          <Button
            onClick={() => setIsOpen(true)}
            size="lg"
            className="animate-fade-in-up shadow-lg"
            style={{ animationDelay: "0.6s" }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        {petals.map((p) => (
          <Petal key={p.id} style={p.style}>
            {p.icon}
          </Petal>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-8">
        <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm animate-fade-in-up shadow-2xl border-2 border-primary/20">
          <CardContent className="p-6 sm:p-10">
            <div className="font-body text-lg leading-relaxed text-foreground">
              {formattedLetter}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
