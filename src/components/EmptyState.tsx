import React from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-neutral-100 rounded-full p-6 mb-4">
        <PackageOpen size={48} className="text-neutral-400" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-800 mb-2">{title}</h3>
      <p className="text-neutral-600 max-w-md mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary text-white hover:btn-primary px-6 py-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;