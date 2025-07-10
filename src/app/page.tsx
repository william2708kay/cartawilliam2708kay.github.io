import { LetterOpener } from '@/components/letter-opener';

const letterContent = `Mi querida Daiana,

Cada día a tu lado es un regalo, un nuevo pétalo que se añade a la flor de nuestro amor. Pienso en ti y mi mundo se ilumina, como un jardín bañado por el sol de la mañana. Eres la melodía que alegra mis días y la calma que me abraza en la noche.

Los lirios, con su elegancia, me recuerdan tu gracia; los tulipanes, con sus colores vibrantes, tu alegría; y las rosas, con su perfume embriagador, la pasión que despiertas en mí. Eres la flor más bella en el jardín de mi vida, y mi amor por ti crece más fuerte con cada amanecer.

Con todo mi amor,
Tu admirador secreto.`;

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-background to-secondary/30">
      <LetterOpener
        letter={letterContent}
        openingText="Para Daiana"
        buttonText="Abrir Carta"
      />
    </main>
  );
}
