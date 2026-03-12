import { useMutation } from '@tanstack/react-query';
import { postResetPasswordService } from '../../services/postResetPassword/postResetPassword.service';
import { PostResetPasswordInputDto } from '../../services/postResetPassword/postResetPassword.dto';

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: (body: PostResetPasswordInputDto) => postResetPasswordService.execute(body),
  });
}
