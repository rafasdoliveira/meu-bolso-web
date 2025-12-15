import { ReactNode } from 'react';
import { UseFormReturn, FieldValues } from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  children: ReactNode;
  form: UseFormReturn<T>;
}

const Form = <T extends FieldValues>({ children, form }: FormProps<T>) => {
  return (
    <form className='flex flex-col gap-4'>
      {children}
      {form?.formState.errors.root && (
        <div className='text-center text-sm text-red-500'>
          {form?.formState.errors.root.message}
        </div>
      )}
    </form>
  );
};

export default Form;
