'use server';

/**
 * @fileOverview Generates a personalized love letter with floral themes and a custom opening.
 *
 * - generateLoveLetter - A function that generates the love letter.
 * - GenerateLoveLetterInput - The input type for the generateLoveLetter function.
 * - GenerateLoveLetterOutput - The return type for the generateLoveLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLoveLetterInputSchema = z.object({
  recipientName: z.string().describe('The name of the recipient.'),
  floralTheme: z.enum(['lilies', 'tulips']).describe('The floral theme for the letter.'),
  customOpening: z.string().describe('The custom opening message (e.g., Para Daiana).'),
  tone: z.string().optional().describe('The tone of the love letter (e.g., romantic, passionate). Defaults to romantic.'),
  repeatPhrase: z.string().optional().describe('A phrase the LLM should repeat if it makes sense to do so, to emphasize it.'),
});
export type GenerateLoveLetterInput = z.infer<typeof GenerateLoveLetterInputSchema>;

const GenerateLoveLetterOutputSchema = z.object({
  letter: z.string().describe('The generated love letter.'),
});
export type GenerateLoveLetterOutput = z.infer<typeof GenerateLoveLetterOutputSchema>;

export async function generateLoveLetter(input: GenerateLoveLetterInput): Promise<GenerateLoveLetterOutput> {
  return generateLoveLetterFlow(input);
}

const generateLoveLetterPrompt = ai.definePrompt({
  name: 'generateLoveLetterPrompt',
  input: {schema: GenerateLoveLetterInputSchema},
  output: {schema: GenerateLoveLetterOutputSchema},
  prompt: `You are a professional love letter writer, skilled at creating heartfelt and personalized messages.

  Compose a love letter for {{recipientName}} with a {{floralTheme}} theme and the opening "{{customOpening}}".  The tone of the letter should be {{tone}}.

  Incorporate imagery and symbolism related to {{floralTheme}} throughout the letter.
  If the following phrase makes sense in the context of the letter, repeat it: "{{repeatPhrase}}".  This is optional.
  The love letter should be approximately 200-300 words.
  `,
});

const generateLoveLetterFlow = ai.defineFlow(
  {
    name: 'generateLoveLetterFlow',
    inputSchema: GenerateLoveLetterInputSchema,
    outputSchema: GenerateLoveLetterOutputSchema,
  },
  async input => {
    const {
      recipientName,
      floralTheme,
      customOpening,
      tone = 'romantic',
      repeatPhrase = '',
    } = input;
    const {output} = await generateLoveLetterPrompt({
      recipientName,
      floralTheme,
      customOpening,
      tone,
      repeatPhrase,
    });
    return output!;
  }
);
