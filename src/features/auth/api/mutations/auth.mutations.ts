import { useMutation } from '@tanstack/react-query';

import { AuthService } from '../../services/auth.service';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => AuthService.forgotPassword(email)
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) => AuthService.resetPassword(token, password)
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) => AuthService.changePassword(data.oldPassword, data.newPassword)
  });
};
