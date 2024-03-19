import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type CustomSelectProps = {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectionChange: (value: string) => void;
  className?: string;
};

export function CustomSelect({
  label,
  options,
  selectedOption,
  onSelectionChange,
  className,
}: CustomSelectProps) {
  return (
    <div className={cn('relative flex flex-col gap-2', className)}>
      <label className='font-semibold'>{label}</label>
      <Select value={selectedOption} onValueChange={onSelectionChange}>
        <SelectTrigger>
          <SelectValue placeholder={label} />
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
