import { getTokenFormLocal } from '@/utils/helper/token-helper';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

export function ProtectedWrapper({ children }: { children: ReactNode }) {
  const token = getTokenFormLocal();

  if (!token) {
    toast.error('Login First');
    return <Navigate to={'/login'} />;
  }

  return children;
}
