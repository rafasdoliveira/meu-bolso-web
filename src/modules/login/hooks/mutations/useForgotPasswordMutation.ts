import { useMutation } from '@tanstack/react-query';
import { postForgotPasswordService } from '../../services/postForgotPassword/postForgotPassword.service';
import { PostForgotPasswordInputDto } from '../../services/postForgotPassword/postForgotPassword.dto';

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (body: PostForgotPasswordInputDto) => postForgotPasswordService.execute(body),
  });
}
