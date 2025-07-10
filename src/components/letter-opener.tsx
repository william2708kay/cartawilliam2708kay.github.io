
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LilyIcon } from "@/components/icons/lily-icon";
import { TulipIcon } from "@/components/icons/tulip-icon";
import { RoseIcon } from "@/components/icons/rose-icon";

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

const AnimatedText = ({ text }: { text: string }) => {
  const [visibleText, setVisibleText] = useState("");
  const typingSpeed = 50; // milliseconds per character

  useEffect(() => {
    if (text) {
      let i = 0;
      const interval = setInterval(() => {
        setVisibleText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
        }
      }, typingSpeed);
      return () => clearInterval(interval);
    }
  }, [text]);

  return <>{visibleText}</>;
};

export function LetterOpener({
  letter,
  openingText,
  buttonText,
}: {
  letter: string;
  openingText: string;
  buttonText: string;
}) {
  const [step, setStep] = useState<'initial' | 'playingVideo' | 'specialMessage' | 'showingLetter'>('initial');
  const [petals, setPetals] = useState<
    {
      id: number;
      style: React.CSSProperties;
      icon: JSX.Element;
    }[]
  >([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (step === 'showingLetter') {
      const newPetals = Array.from({ length: 30 }).map((_, i) => {
        let icon;
        const rand = Math.random();
        if (rand < 0.33) {
          icon = <LilyIcon className="w-6 h-6" />;
        } else if (rand < 0.66) {
          icon = <TulipIcon className="w-6 h-6" />;
        } else {
          icon = <RoseIcon className="w-6 h-6" />;
        }

        return {
          id: i,
          style: {
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 8 + 7}s`,
            animationDelay: `${Math.random() * 10}s`,
            transform: `scale(${Math.random() * 0.5 + 0.6})`,
          },
          icon: icon,
        };
      });
      setPetals(newPetals);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'specialMessage') {
      const timer = setTimeout(() => {
        setStep('showingLetter');
      }, 4000); // Show message for 4 seconds
      return () => clearTimeout(timer);
    }
  }, [step]);
  
  useEffect(() => {
    if (step === 'playingVideo' && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video play failed:", error);
        // If play fails, skip to the next step
        setStep('specialMessage');
      });
    }
  }, [step]);


  const handleOpenClick = () => {
    setStep('playingVideo');
  };

  const handleVideoEnd = () => {
    setStep('specialMessage');
  };

  const formattedLetter = useMemo(() => {
    return letter.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-6 last:mb-0">
        {paragraph ? <AnimatedText text={paragraph} /> : <br />}
      </p>
    ));
  }, [letter]);


  if (step === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
        <div className="relative text-center flex flex-col items-center">
          <LilyIcon className="absolute -top-16 -left-24 h-32 w-32 text-primary/30 opacity-20 -rotate-45 animate-pulse-slow" />
          <RoseIcon className="absolute -bottom-16 -right-24 h-32 w-32 text-accent/30 opacity-20 rotate-45 animate-pulse-slow" />
          <div className="mb-8 w-[200px] h-[200px] flex items-center justify-center">
             <img 
              src="/principal.gif"
              alt="principal" 
              width={200} 
              height={200}
            />
          </div>
          <h1
            className="text-6xl md:text-8xl font-headline mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {openingText}
          </h1>
          <Button
            onClick={handleOpenClick}
            size="lg"
            className="animate-fade-in-up shadow-lg text-lg px-10 py-8 rounded-full animate-pulse"
            style={{ animationDelay: "0.6s" }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'playingVideo') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src="/transicion.mp4"
          className="max-w-full max-h-full"
          onEnded={handleVideoEnd}
          onError={handleVideoEnd}
          muted
          playsInline
        />
      </div>
    );
  }

  if (step === 'specialMessage') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <h1 className="text-5xl md:text-7xl font-headline text-foreground animate-fade-in-up">
          PARA MI PERSONA ESPECIAL
        </h1>
      </div>
    );
  }

  if (step === 'showingLetter') {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-background to-secondary/30">
        <div className="absolute inset-0 z-0">
          {petals.map((p) => (
            <Petal key={p.id} style={p.style}>
              {p.icon}
            </Petal>
          ))}
        </div>
  
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-8">
          <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm animate-fade-in-up shadow-2xl border-2 border-primary/20 rounded-2xl">
            <CardContent className="p-8 sm:p-12">
              <div className="font-body text-2xl md:text-3xl leading-loose text-foreground/90">
                {formattedLetter}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
