import React from 'react';

import { useModal } from '@/stores';

import { ConfirmationModal } from './confirmationModal';
import { FormModal } from './formModal';

// Utility functions for common modal patterns
export const useConfirmationModal = () => {
  const modal = useModal('confirmation-modal');

  const confirm = (options: {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
    onConfirm: () => void;
    onCancel?: () => void;
  }) => {
    modal.open(ConfirmationModal, {
      title: options.title || 'Confirm Action',
      message: options.message,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      variant: options.variant,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel
    });
  };

  return { confirm, close: modal.close };
};

export const useFormModal = () => {
  const modal = useModal('form-modal');

  const openForm = (options: {
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    onSubmit?: () => void;
    submitText?: string;
    showFooter?: boolean;
  }) => {
    modal.open(
      FormModal,
      {
        title: options.title,
        children: options.children,
        onSubmit: options.onSubmit,
        submitText: options.submitText,
        showFooter: options.showFooter
      },
      {
        size: options.size
      }
    );
  };

  return { openForm, close: modal.close, update: modal.update };
};
