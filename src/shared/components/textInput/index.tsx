import { Label } from '../ui/label';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Input, InputProps } from '../ui/input';
import { Asterisk, Info } from 'lucide-react';
import { Tooltip } from '@shared/components/tooltip';

interface TextInputProps<T extends FieldValues> extends InputProps {
  label?: string;
  name: Path<T>;
  required: boolean;
  control: Control<T>;
  tooltipText?: string;
  divClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const TextInput = <T extends FieldValues>({
  name,
  label,
  control,
  required,
  tooltipText,
  divClassName = 'px-2',
  type = 'text',
  inputClassName = 'placeholder:text-xs',
  labelClassName = 'font-semibold mb-2',
  ...rest
}: TextInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={divClassName}>
      <div className='flex justify-between'>
        <div className='flex items-start'>
          <Label className={labelClassName}>{label}</Label>
          {required && <Asterisk color='#ff2600' className='h-3 w-3' />}
        </div>
        <div>
          {tooltipText && (
            <Tooltip text={tooltipText}>
              <Info className='h-3 w-3' />
            </Tooltip>
          )}
        </div>
      </div>
      <Input
        {...rest}
        id={name}
        type={type}
        {...field}
        className={inputClassName}
      />
      {error && (
        <div className='mt-2 text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export default TextInput;
