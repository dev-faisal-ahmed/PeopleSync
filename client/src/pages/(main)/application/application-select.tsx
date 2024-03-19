import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobType } from '@/utils/types/job.types';

type ApplicationSelectProps = {
  selectedId: string;
  onSelectedIdChange: (id: string) => void;
  jobs: JobType[];
  className?: string;
};

export function ApplicationSelect({
  selectedId,
  onSelectedIdChange,
  jobs,
  className,
}: ApplicationSelectProps) {
  return (
    <div className={className}>
      <Select value={selectedId} onValueChange={onSelectedIdChange}>
        <SelectTrigger>
          <SelectValue placeholder={'Select Any Job'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Any Job</SelectLabel>
            {jobs.map((data) => (
              <SelectItem key={data._id} className='uppercase' value={data._id}>
                {data.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
