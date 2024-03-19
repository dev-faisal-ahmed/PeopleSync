import { useAppSelector } from '@/redux/redux-hook';
import { ApplicationStatusType } from '@/utils/types/application.type';
import { ReactNode } from 'react';

type ApplicationStatusTogglerProps = {
  children: ReactNode;
  onClick: () => void;
  status: ApplicationStatusType | 'all';
};

export function ApplicationStatusToggler({
  children,
  onClick,
  status,
}: ApplicationStatusTogglerProps) {
  const { enabledStatus } = useAppSelector((state) => state.application);
  return (
    <p
      className={`cursor-pointer border-b-2 border-transparent p-3 ${enabledStatus === status ? 'border-primary' : ''}`}
      onClick={onClick}
    >
      {children}
    </p>
  );
}
