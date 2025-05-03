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

  return JSON.parse(response.output_text);
};
