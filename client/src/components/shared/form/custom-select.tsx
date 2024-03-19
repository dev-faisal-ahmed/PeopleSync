import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type CustomSelectProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  selectedOption: string;
  onSelectionChange: (value: string) => void;
  className?: string;
  disable?: boolean;
};

export function CustomSelect({
  label,
  placeholder,
  options,
  selectedOption,
  onSelectionChange,
  className,
  disable,
}: CustomSelectProps) {
  return (
    <div className={cn('relative flex flex-col gap-2', className)}>
      {label && <label className='font-semibold'>{label}</label>}
      <Select
        disabled={disable}
        value={selectedOption}
        onValueChange={onSelectionChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={label || placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((data) => (
              <SelectItem key={data} className='uppercase' value={data}>
                {data}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
