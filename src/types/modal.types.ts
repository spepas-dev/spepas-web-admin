import React from 'react';

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  persistent?: boolean;
  className?: string;
}

export interface ModalConfig {
  id: string;
  component: React.ComponentType<BaseModalProps & Record<string, unknown>>;
  props?: Record<string, unknown>;
  options?: {
    persistent?: boolean;
    size?: BaseModalProps['size'];
    className?: string;
    onClose?: () => void;
  };
}

export type ModalType = 'confirmation' | 'form' | 'info' | 'custom';
