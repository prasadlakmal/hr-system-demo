import { useState } from 'react';

const useToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  const showToast = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setToast({ message, severity });
  };

  const closeToast = () => {
    setToast(null);
  };

  return { toast, showToast, closeToast };
};

export default useToast;
