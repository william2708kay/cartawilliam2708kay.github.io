
"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LilyIcon, TulipIcon, RoseIcon } from "@/components/icons";
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
    className="absolute text-primary"
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

const AnimatedParagraph = ({ text, delay }: { text: string; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    hasMounted.current = true;
    const timer = setTimeout(() => {
       if (hasMounted.current) {
        setIsVisible(true)
       }
    }, delay);
    return () => {
        hasMounted.current = false;
        clearTimeout(timer);
    }
  }, [delay]);

  return (
    <p
      className={`mb-6 last:mb-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      {text ? text : <br />}
    </p>
  );
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
  const [uniqueGifSrc, setUniqueGifSrc] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setUniqueGifSrc(`/principal.gif?_t=${new Date().getTime()}`);
    
    const unlockDate = new Date('2025-07-19T00:00:00');
    const checkDate = () => {
        const now = new Date();
        setIsFinalButtonEnabled(now >= unlockDate);
    };
    checkDate();
    const interval = setInterval(checkDate, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const generatePetals = () => {
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
    };

    generatePetals();
  }, [isMounted]);

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
      <AnimatedParagraph key={index} text={paragraph} delay={index * 1000 + 500} />
    ));
  }, [letter]);


  if (step === 'initial') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative">
         {isMounted && <Fireworks />}
         <div className="absolute inset-0 z-0">
          {petals.map((p) => (
            <Petal key={p.id} style={p.style}>
              {p.icon}
            </Petal>
          ))}
        </div>
        <div className="relative text-center flex flex-col items-center z-10">
          <div className="mb-8 w-[200px] h-[200px] flex items-center justify-center animate-zoom-in rounded-full border-4 border-primary/50 p-1 shadow-2xl" style={{ animationDelay: '0.2s' }}>
             {uniqueGifSrc && (
              <img 
                src={uniqueGifSrc}
                alt="principal" 
                width={200} 
                height={200}
                className="rounded-full"
              />
            )}
          </div>
          <h1
            className="text-6xl md:text-8xl text-primary-foreground mb-12 animate-zoom-in font-great-vibes"
             style={{ animationDelay: '0.5s' }}
          >
            {openingText}
          </h1>
          <Button
            onClick={handleOpenClick}
            size="lg"
            className="animate-zoom-in shadow-lg text-lg px-10 py-8 rounded-full animate-pulse-slow"
            style={{ animationDelay: "1s" }}
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
            <h1 className="text-5xl md:text-7xl text-primary-foreground animate-fade-in-up font-bold font-cormorant" style={{animation: 'fade-in-up 1s ease-out forwards, pulse-slow 2s infinite 1s'}}>
                PARA MI PERSONA ESPECIAL
            </h1>
        </div>
      </div>
    );
  }
  
  if (step === 'finalSurprise') {
    return (
      <div 
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed font-great-vibes"
        style={{ backgroundImage: "url('/para-la-carta.jpeg')" }}
        data-ai-hint="romantic letter background"
      >
        {isMounted && <Fireworks />}
        <audio ref={audioRef} loop hidden>
          <source src="/music.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
        <div className="relative text-center p-6 md:p-8 z-10 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
          <Heart className="w-24 h-24 text-red-500 mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl md:text-6xl text-gray-800 animate-fade-in-up font-bold">
            Feliz Cumpleaños Daiana
          </h1>
          <div className="mt-6 text-2xl md:text-3xl text-gray-700/90 space-y-4">
            <p className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>bueno esto lo escribi antes de todo lo que pase el jueves y no se si soy tu novio o no jsjsadhj pero si en el caso lo eres felicidades mi vidaa te amoooo muchoo muchoo ,que este día esté lleno de alegría y amor con las personas que mas quieres.</p>
            <p className="animate-fade-in-up" style={{ animationDelay: "1.0s" }}>Espero que tus metas se cumplan y éxitos en todo, señorita.siempre estaras en mi mente y corazon Te quiero mucho y te extraño.</p>
            <p className="mt-8 font-bold animate-fade-in-up" style={{ animationDelay: "1.5s" }}>- Con mucho amor, William</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'showingLetter') {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          {petals.map((p) => (
            <Petal key={p.id} style={p.style}>
              {p.icon}
            </Petal>
          ))}
        </div>
  
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
          <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm animate-zoom-in shadow-2xl border-4 border-primary/30 rounded-2xl">
            <CardContent className="p-8 sm:p-12">
               <div className="mb-8 flex justify-center">
                <Image
                  src="/dentrolacarta.jpeg"
                  alt="Recuerdo especial"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                  data-ai-hint="romantic couple"
                  unoptimized={true}
                />
              </div>
              <div className="text-2xl leading-loose text-card-foreground font-great-vibes">
                {formattedLetter}
              </div>
            </CardContent>
          </Card>
          <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Button
              onClick={handleFinalButtonClick}
              size="lg"
              className={`shadow-lg text-lg px-10 py-8 rounded-full transition-all duration-300 font-bold ${
                !isFinalButtonEnabled ? 'cursor-not-allowed opacity-60 bg-muted text-muted-foreground' : 'animate-pulse'
              }`}
            >
              <Heart className="mr-3" />
              {isFinalButtonEnabled ? 'Abrir Sorpresa Final' : 'Una sorpresa para el futuro'}
            </Button>
            {!isFinalButtonEnabled && (
              <p className="text-center mt-4 text-sm text-card-foreground/70 font-cormorant">
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
