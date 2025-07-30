import { useMutation } from '@tanstack/react-query';

import { ChangePasswordService } from '../../services/change-password.service';
import { ChangePasswordDTO } from '../../types/settings.types';

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordDTO) => ChangePasswordService.changePassword(data)
  });
};
