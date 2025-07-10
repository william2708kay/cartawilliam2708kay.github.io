
import { LetterOpener } from '@/components/letter-opener';

const letterContent = `Mi querida Daiana,

Hola, Dais, ¿cómo estás? Estuve preparando esto en mis tiempos libres. Originalmente era para tu cumple, pero supongo que hoy es el final... En fin, ya que trabajo en esto, qué mejor forma de transformar mi trabajo en algo especial para ti.

Gracias por acompañarme hoy a ver Superman. Es mi superhéroe favorito, junto con Spiderman, y aunque todavía no he visto esa, sé que estará genial. Me encanta el cine, pero lo más bonito de ir es tener tu compañía, siempre la disfruto muchísimo.

Cada momento contigo, por simple que sea, se convierte en un recuerdo increíble. Eres esa persona que ilumina todo, y por eso te estoy tan agradecido.

Con todo mi amor,
William`;

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
