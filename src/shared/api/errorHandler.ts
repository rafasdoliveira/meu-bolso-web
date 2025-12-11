/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

const errorHandler = (error: any, context?: string) => {
  let err: string;

  const hasMultipleErrors = Array.isArray(error.response?.data.mensagem);
  if (hasMultipleErrors) {
    err = `${
      error.response.data.statusCode
    }: ${error.response.data.mensagem.join(' / ')}`;
  } else if (error.response.data) {
    err = `${error.response.status}: ${error.response.data.mensagem}`;
  } else {
    err = '500: Erro interno do servidor';
  }

  console.error(`${context?.toUpperCase()} - ${err}`);
  toast.error(err);
};

export { errorHandler };
