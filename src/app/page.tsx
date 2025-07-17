
import { LetterOpener } from '@/components/letter-opener';

const letterContent = `Mi querida Daiana,

Hola, Dais, ¿cómo estás? Estuve preparando esto en mis tiempos libres. Originalmente era para tu cumple, pero supongo que hoy es el final... En fin, ya que trabajo en esto, qué mejor forma de transformar mi trabajo en algo especial para ti. Te dejé algo al final, pero tendrás que esperar.

Gracias por acompañarme hoy a ver Superman. Es mi superhéroe favorito, junto con Spiderman, y aunque todavía no he visto la película a la hora que escribo esto, sé que estará genial. Me encanta el cine, pero lo más bonito de ir es tener tu compañía; la disfruto muchísimo.

Cada momento contigo, por simple que sea, ha sido un regalo. A veces se gana o se pierde, y aunque no quería que esto terminara así, atesoro cada instante que pasamos juntos. Te deseo todo lo mejor, señorita encantadora. Y si alguna vez te hice sentir mal o cometí un error, te pido perdón de todo corazón.

Atentamente,
William`;

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
