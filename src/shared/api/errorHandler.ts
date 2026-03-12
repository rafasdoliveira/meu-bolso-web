/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

function getApiErrorMessage(error: any, fallback = 'Ocorreu um erro inesperado.'): string {
  const data = error?.response?.data;
  if (!data) return fallback;

  // New API format: { message: string | string[] }
  if (data.message) {
    return Array.isArray(data.message) ? data.message.join(' / ') : data.message;
  }

  // Legacy format: { mensagem: string | string[] }
  if (data.mensagem) {
    return Array.isArray(data.mensagem) ? data.mensagem.join(' / ') : data.mensagem;
  }

  return fallback;
}

const errorHandler = (error: any, context?: string) => {
  const message = getApiErrorMessage(error);
  if (context) console.error(`${context.toUpperCase()} - ${message}`);
  toast.error(message);
};

export { errorHandler, getApiErrorMessage };
