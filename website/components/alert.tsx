import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface AlertProps {
  variant: 'destructive' | 'info' | 'warning' | 'success';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ variant, message }) => {
  const getAlertStyles = () => {
    switch (variant) {
      case 'destructive':
        return 'bg-red-950 border-red-800 text-red-500';
      case 'info':
        return 'bg-blue-950 border-blue-800 text-blue-500';
      case 'warning':
        return 'bg-yellow-950 border-yellow-800 text-yellow-500';
      case 'success':
        return 'bg-green-950 border-green-800 text-green-500';
      default:
        return 'bg-gray-950 border-gray-800 text-gray-500';
    }
  };

  return (
    <div className={`rounded-md border p-4 ${getAlertStyles()}`}>
      <div className="flex items-center">
        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Alert;

