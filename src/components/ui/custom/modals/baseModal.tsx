// components/ui/base-modal.tsx
import React from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { BaseModalProps } from '@/types/modal.types';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[95vw] max-h-[95vh]'
};

export const BaseModal: React.FC<BaseModalProps & { children: React.ReactNode }> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  persistent = false,
  className,
  children
}) => {
  const handleOpenChange = (open: boolean) => {
    if (!open && !persistent) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(sizeClasses[size], className)}
        onPointerDownOutside={(e) => persistent && e.preventDefault()}
        onEscapeKeyDown={(e) => persistent && e.preventDefault()}
      >
        <DialogHeader>
          {title && <DialogTitle className="text-[#4A36EC] text-xl font-bold">{title}</DialogTitle>}
          {description && <DialogDescription className="text-gray-600">{description}</DialogDescription>}
        </DialogHeader>

        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
