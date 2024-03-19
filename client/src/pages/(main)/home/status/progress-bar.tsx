type ProgressBarProps = {
  title: string;
  color: string;
  percentage: number;
};

export function ProgressBar({ title, color, percentage }: ProgressBarProps) {
  return (
    <>
      <div className='flex items-center gap-3'>
        <span
          style={{ backgroundColor: color }}
          className='size-3 rounded-full'
        />
        <p>{title}</p>
      </div>
      <div className='flex items-center gap-3'>
        <div className='h-2 w-full rounded-full bg-primary-foreground'>
          <div
            className='h-2 rounded-full'
            style={{ width: `${percentage}%`, backgroundColor: color }}
          ></div>
        </div>
        {Math.floor(percentage)}%
      </div>
    </>
  );
}
