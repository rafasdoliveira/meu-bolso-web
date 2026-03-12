import { useMutation } from '@tanstack/react-query';
import { postLogoutService } from '../../services/postLogout/postLogout.service';

export function useLogoutMutation() {
  return useMutation({
    mutationFn: () => postLogoutService.execute(),
  });
}
