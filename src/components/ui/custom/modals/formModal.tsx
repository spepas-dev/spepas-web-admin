// components/modals/form-modal.tsx
import React from 'react';

import { Button } from '@/components/ui/button';
import { BaseModalProps } from '@/types/modal.types';

import { BaseModal } from './baseModal';

interface FormModalProps extends Omit<BaseModalProps, 'children'> {
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  showFooter?: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  children,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  loading = false,
  showFooter = true,
  ...baseProps
}) => {
  return (
    <BaseModal {...baseProps}>
      <div className="space-y-4">
        {children}
        {showFooter && (
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={baseProps.onClose} disabled={loading}>
              {cancelText}
            </Button>
            {onSubmit && (
              <Button onClick={onSubmit} disabled={loading}>
                {loading ? 'Loading...' : submitText}
              </Button>
            )}
          </div>
        )}
      </div>
    </BaseModal>
  );
};
