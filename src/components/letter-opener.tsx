
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LilyIcon } from "@/components/icons/lily-icon";
import { TulipIcon } from "@/components/icons/tulip-icon";
import { RoseIcon } from "@/components/icons/rose-icon";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { Fireworks } from "./fireworks";
import Image from "next/image";

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
  const typingSpeed = 80;

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
  const [step, setStep] = useState<'initial' | 'specialMessage' | 'showingLetter' | 'finalSurprise'>('initial');
  const [petals, setPetals] = useState<
    {
      id: number;
      style: React.CSSProperties;
      icon: JSX.Element;
    }[]
  >([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const [isFinalButtonEnabled, setIsFinalButtonEnabled] = useState(false);

  const handleFinalButtonClick = () => {
    if (isFinalButtonEnabled) {
      setStep('finalSurprise');
    } else {
      toast({
        title: "Aún no es tiempo...",
        description: "señorita desesperada. ❤️",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    const unlockDate = new Date('2025-07-19T00:00:00');
    const now = new Date();
    setIsFinalButtonEnabled(now >= unlockDate);
  }, []);

  useEffect(() => {
    if (step === 'showingLetter' || step === 'initial') {
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
    const audio = audioRef.current;
    if (step === 'finalSurprise' && audio) {
      audio.volume = 0.2; // Set low volume
      audio.play().catch(error => console.error("Error al reproducir audio:", error));
    }
    
    return () => {
      audio?.pause();
    };
  }, [step]);


  const handleOpenClick = () => {
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
         <div className="absolute inset-0 z-0">
          {petals.map((p) => (
            <Petal key={p.id} style={p.style}>
              {p.icon}
            </Petal>
          ))}
        </div>
        <div className="relative text-center flex flex-col items-center">
          <LilyIcon className="absolute -top-16 -left-24 h-32 w-32 text-primary/30 opacity-20 -rotate-45 animate-pulse-slow" />
          <RoseIcon className="absolute -bottom-16 -right-24 h-32 w-32 text-accent/30 opacity-20 rotate-45 animate-pulse-slow" />
          <div className="mb-8 w-[200px] h-[200px] flex items-center justify-center">
             <Image 
              src="/principal.gif"
              alt="principal" 
              width={200} 
              height={200}
              unoptimized
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

  if (step === 'specialMessage') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background animate-fade-in">
        <div className="relative text-center">
            <Heart className="w-12 h-12 text-primary absolute -top-16 left-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <Heart className="w-8 h-8 text-primary/70 absolute top-8 -left-20 animate-pulse" style={{ animationDelay: '0.4s' }} />
            <Heart className="w-8 h-8 text-primary/70 absolute bottom-8 -right-20 animate-pulse" style={{ animationDelay: '0.6s' }} />
            <h1 className="text-5xl md:text-7xl font-headline text-foreground animate-fade-in-up">
            PARA MI PERSONA ESPECIAL
            </h1>
        </div>
      </div>
    );
  }
  
  if (step === 'finalSurprise') {
    return (
      <div 
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/para-la-carta.jpeg')" }}
        data-ai-hint="romantic letter background"
      >
        <Fireworks />
        <audio ref={audioRef} loop hidden>
          <source src="/music.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
        <div className="relative text-center p-6 md:p-8 z-10 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
          <Heart className="w-24 h-24 text-red-500 mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl md:text-6xl font-headline text-foreground animate-fade-in-up">
            Feliz Cumpleaños Daiana
          </h1>
          <div className="mt-6 text-2xl md:text-3xl text-foreground/90 animate-fade-in-up space-y-4" style={{ animationDelay: "0.5s" }}>
            <p>Sé que ya no estoy ahí para ti pero me hubiera encantado llevarte a mis lugares preferidos, comer hasta engordar, concentirte como una niña tenerte de la mano... en fin, no quiero estar sentimental ni nada, pero que este día esté lleno de alegría y amor.</p>
            <p>Te quiero mucho y te extraño.</p>
            <p>Espero que tus metas se cumplan y éxitos en todo, señorita. Créeme que siempre te tendré en mi mente como un lindo recuerdo.</p>
            <p className="mt-8 font-bold">- Con mucho amor, William</p>
          </div>
        </div>
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
  
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
          <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm animate-fade-in-up shadow-2xl border-2 border-primary/20 rounded-2xl">
            <CardContent className="p-8 sm:p-12">
               <div className="mb-8 flex justify-center">
                <Image
                  src="/dentrolacarta.jpeg"
                  alt="Recuerdo especial"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="romantic couple"
                />
              </div>
              <div className="font-body text-2xl md:text-3xl leading-loose text-foreground/90">
                {formattedLetter}
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button
              onClick={handleFinalButtonClick}
              size="lg"
              className={`shadow-lg text-lg px-10 py-8 rounded-full transition-all duration-300 ${
                !isFinalButtonEnabled ? 'cursor-not-allowed opacity-60 bg-muted' : 'animate-pulse'
              }`}
            >
              <Heart className="mr-3" />
              {isFinalButtonEnabled ? 'Abrir Sorpresa Final' : 'Una sorpresa para el futuro'}
            </Button>
            {!isFinalButtonEnabled && (
              <p className="text-center mt-4 text-sm text-foreground/70">
                Se desbloqueará el 19 de Julio de 2025
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
