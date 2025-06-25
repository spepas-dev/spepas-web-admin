// components/ui/base-modal.tsx
import { X } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
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
        {!persistent && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}

        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
