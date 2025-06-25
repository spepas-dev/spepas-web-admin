// components/modals/confirmation-modal.tsx
import React from 'react';

import { Button } from '@/components/ui/button';
import { BaseModalProps } from '@/types/modal.types';

import { BaseModal } from './baseModal';

interface ConfirmationModalProps extends Omit<BaseModalProps, 'children'> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  loading = false,
  ...baseProps
}) => {
  const handleConfirm = () => {
    onConfirm();
    baseProps.onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    baseProps.onClose();
  };

  return (
    <BaseModal {...baseProps}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{message}</p>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={variant === 'destructive' ? 'destructive' : 'default'} onClick={handleConfirm} disabled={loading}>
            {loading ? 'Loading...' : confirmText}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
