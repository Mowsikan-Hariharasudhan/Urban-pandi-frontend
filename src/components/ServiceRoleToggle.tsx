import React from 'react';
import { cn } from '@/lib/utils';

export type ServiceRole = 'seeker' | 'provider';

interface ServiceRoleToggleProps {
  role: ServiceRole;
  onChange: (role: ServiceRole) => void;
  className?: string;
}

const ServiceRoleToggle: React.FC<ServiceRoleToggleProps> = ({ role, onChange, className }) => {
  return (
    <div className={cn('inline-flex rounded-full border border-blue-200 bg-white p-1 shadow-sm', className)}>
      <button
        type="button"
        onClick={() => onChange('seeker')}
        className={cn(
          'px-5 py-2 text-sm font-medium rounded-full transition-all',
          role === 'seeker'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow'
            : 'text-blue-600 hover:bg-blue-50'
        )}
        aria-label="Need help"
      >
        Services offered
      </button>
      <button
        type="button"
        onClick={() => onChange('provider')}
        className={cn(
          'px-5 py-2 text-sm font-medium rounded-full transition-all',
          role === 'provider'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow'
            : 'text-blue-600 hover:bg-blue-50'
        )}
        aria-label="Offer services"
      >
        Services needed
      </button>
    </div>
  );
};

export default ServiceRoleToggle;
