import { generateLoveLetter } from '@/ai/flows/generate-love-letter';
import { LetterOpener } from '@/components/letter-opener';

export default async function Home() {
  let letterContent = "Hubo un error al generar la carta. Por favor, inténtalo de nuevo más tarde.";
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
    // The default error message will be used.
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
