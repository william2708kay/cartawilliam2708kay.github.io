
import { LetterOpener } from '@/components/letter-opener';

const letterContent = `Hola, Dais, ¿cómo estás? Estuve preparando esto en mis tiempos libres. Originalmente era para tu cumple, no se si hoy sera el ultimo dia contigo prepare todo esto... En fin, ya que trabajo en esto, qué mejor forma de transformar mi trabajo en algo especial para ti. Te dejé algo al final, pero tendrás que esperar.

Gracias por acompañarme en cada salida Me encanta el cine y empeze a disfrutarlo mas contigo nada nose como sera si no voy contigo, me encanta cuando me haces caricias me encantan tus besos me encanta cuando me dices te amo me encantas tu!! tu mirada tus manitas tu piesitos uff

Cada momento contigo, por simple que sea, ha sido un regalo. atesoro cada instante que pasamos juntos. siempre quedre todo lo mejor para ti quiero que estudies seas una gran persona la mejor y se que lo lograras ocnfio en ti , señorita nose. Y se que te hice sentir mal y cometí un errores , te pido perdón de todo corazón.

no soy perfecto pero siempre quiero ser mejor para ti y solo para ti por eres tu con quien quiero quedarme hasta mi ultimo respiro <3

firma
Will`;

export default function Home() {
  return (
    <main className="bg-background">
      <LetterOpener
        letter={letterContent}
        openingText="Para Daiana"
        buttonText="Abrir Carta"
      />
    </main>
  );
}
