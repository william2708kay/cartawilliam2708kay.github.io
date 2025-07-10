import { generateLoveLetter } from '@/ai/flows/generate-love-letter';
import { LetterOpener } from '@/components/letter-opener';

const fallbackLetter = `Mi querida Daiana,

Cada día a tu lado es un regalo, un nuevo pétalo que se añade a la flor de nuestro amor. Pienso en ti y mi mundo se ilumina, como un jardín bañado por el sol de la mañana. Eres la melodía que alegra mis días y la calma que me abraza en la noche.

Los lirios, con su elegancia, me recuerdan tu gracia; los tulipanes, con sus colores vibrantes, tu alegría; y las rosas, con su perfume embriagador, la pasión que despiertas en mí. Eres la flor más bella en el jardín de mi vida, y mi amor por ti crece más fuerte con cada amanecer.

Con todo mi amor,
Tu admirador secreto.`;

export default async function Home() {
  let letterContent = fallbackLetter;
  try {
    const { letter } = await generateLoveLetter({
      recipientName: 'Daiana',
      floralTheme: 'roses',
      customOpening: 'Para mi querida Daiana,',
      tone: 'apasionado y tierno',
      repeatPhrase: 'eres la flor más bella en el jardín de mi vida',
    });
    letterContent = letter;
  } catch (error) {
    console.error("Error generating love letter:", error);
    // The fallback letter will be used.
  }

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
