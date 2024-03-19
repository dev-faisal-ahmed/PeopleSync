/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomSelect } from '@/components/shared/form/custom-select';
import {
  useGetApplicationByJobIdQuery,
  useUpdateApplicationStatusMutation,
} from '@/redux/api/application';
import { dateFormatter } from '@/utils/helper/date-helper';
import { toast } from 'sonner';
import {
  ApplicationStatusType,
  ApplicationType,
} from '@/utils/types/application.type';

const applicationsStatus: ApplicationStatusType[] = [
  'in_process',
  'on_hold',
  'rejected',
  'shortlisted',
];

export function ApplicationInfoCard({
  _id,
  name,
  imageUrl,
  experience,
  expectedSalary,
  status,
  gender,
  createdAt,
}: ApplicationType) {
  const { refetch } = useGetApplicationByJobIdQuery(_id, { skip: !_id });
  const [updateStatus, { isLoading }] = useUpdateApplicationStatusMutation();

  const onStatusChange = async (value: string) => {
    const toastId = toast.loading('Updating the statues....');
    try {
      const response = await updateStatus({
        applicationId: _id,
        status: value as ApplicationStatusType,
      }).unwrap();

      if (!response.ok) throw new Error(response.message);
      toast.message(response.message);
      refetch();
    } catch (err: any) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error(err.data?.message || 'Something went wrong');
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className='flex gap-5 rounded-md bg-white p-3 lg:items-center'>
      <div>
        <img className='size-12 rounded-full' src={imageUrl} alt='' />
      </div>
      <div className='gird-cols-1 grid w-full space-y-1 lg:grid-cols-5 lg:items-center lg:justify-between lg:space-y-0'>
        <div className='mb-3 lg:mb-0'>
          <h1 className='font-medium'>{name}</h1>
          <p className='mt-1 text-xs text-gray-500'>
            {experience
              ? `${experience} ${experience > 1 ? ' Years ' : ' Year '} Exp`
              : 'Fresher'}{' '}
            | Expected {expectedSalary} K
          </p>
        </div>
        <p className='font-medium  capitalize lg:text-center'>
          <span className='inline-block lg:hidden'>Gender : </span> {gender}
        </p>
        <p className='font-medium lg:text-center'>
          <span className='inline-block lg:hidden'>Status : </span>{' '}
          <span
            className={`uppercase ${status === 'on_hold' && 'text-orange-500'} ${status === 'in_process' && 'text-blue-500'} ${status === 'rejected' && 'text-destructive'} ${status === 'shortlisted' && 'text-primary'}`}
          >
            {status}
          </span>
        </p>
        <p className='font-medium lg:text-center'>
          <span className='inline-block lg:hidden'>Applied At : </span>{' '}
          {dateFormatter(createdAt)}
        </p>
        <div>
          <CustomSelect
            className='mt-3 lg:mt-0'
            options={applicationsStatus}
            selectedOption={status}
            placeholder='Select Any Status'
            onSelectionChange={onStatusChange}
            disable={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
