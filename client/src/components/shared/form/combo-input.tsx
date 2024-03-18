import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { SendHorizontal, X as XIcon } from 'lucide-react';
import { useRef } from 'react';

type ComboInputProps = {
  label: string;
  className?: string;
  placeholder: string;
  selected: Record<string, string>;
  onSelection: (value: string) => void;
  onRemoveSelection: (value: string) => void;
};

export function ComboInput({
  label,
  placeholder,
  selected,
  className,
  onSelection,
  onRemoveSelection,
}: ComboInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelection = () => {
    const value = inputRef.current?.value?.toString();
    if (value) onSelection(value);
    if (inputRef?.current?.value) inputRef.current.value = '';
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label className='font-medium' htmlFor='combo'>
        {label}
      </Label>
      <div className='text-primary-700 flex w-full flex-wrap items-center gap-1 rounded-md border bg-white p-2 outline-none ring-border placeholder:text-sm focus:border-primary focus:ring-1'>
        {selected && (
          <div className='flex flex-wrap gap-1'>
            {Object.keys(selected).map((data) => (
              <span
                key={data}
                className='flex items-center gap-1 whitespace-nowrap rounded bg-primary-foreground p-1 text-xs font-medium text-black'
              >
                {data}

                <XIcon
                  className='cursor-pointer'
                  onClick={() => onRemoveSelection(data)}
                  size={12}
                />
              </span>
            ))}
          </div>
        )}
        <div className='flex flex-1 items-center'>
          <input
            className='w-full items-center  outline-none'
            ref={inputRef}
            id='combo'
            type='text'
            placeholder={placeholder}
          />

          <SendHorizontal
            className='cursor-pointer'
            onClick={handleSelection}
          />
        </div>
      </div>
    </div>
  );
}
