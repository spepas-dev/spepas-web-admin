// Export React components only (for react-refresh compatibility)
export { BaseModal } from './baseModal';
export { ConfirmationModal } from './confirmationModal';
export { FormModal } from './formModal';
export { ModalManager } from './modalManager';

// Export utility hooks explicitly
// eslint-disable-next-line react-refresh/only-export-components
export { useConfirmationModal, useFormModal } from './modal-helpers';
