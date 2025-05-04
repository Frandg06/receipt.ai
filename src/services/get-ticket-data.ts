import { openai } from '../lib/openai';
import { ticketParserPrompt } from '../lib/prompt';
import { Receipt } from '../types/ticket';

export const getTicketData = async (url: string): Promise<Receipt> => {
  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      {
        role: 'system',
        content: ticketParserPrompt,
      },
      {
        role: 'user',
        content: [
          { type: 'input_text', text: 'Aquí tienes la imagen del ticket:' },
          {
            type: 'input_image',
            image_url: url,
            detail: 'auto',
          },
        ],
      },
    ],
  });

  const resposnse = JSON.parse(response.output_text);

  console.log('resposnse', resposnse.error.message);

  if (resposnse?.error?.message) {
    throw new Error(resposnse.error.message);
  }

  return resposnse.receipt;
};
