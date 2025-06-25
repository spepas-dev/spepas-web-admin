// components/modal-manager.tsx
import React from 'react';

import { useStore } from '@/stores';
import { BaseModalProps } from '@/types/modal.types';

export const ModalManager: React.FC = () => {
  const modals = useStore((state) => state.modals);
  const actions = useStore((state) => state.actions);

  return (
    <>
      {modals?.map((modal) => {
        const Component = modal.component as React.ComponentType<BaseModalProps & Record<string, unknown>>;
        return <Component key={modal.id} isOpen={true} onClose={() => actions.closeModal(modal.id)} {...modal.props} {...modal.options} />;
      })}
    </>
  );
};
