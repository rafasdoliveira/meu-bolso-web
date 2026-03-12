import { useMutation } from '@tanstack/react-query';
import { postLoginService } from '../../services/postLogin/postLogin.service';
import { PostLoginInputDto } from '../../services/postLogin/postLogin.dto';

export function useLoginMutation() {
  return useMutation({
    mutationFn: (body: PostLoginInputDto) => postLoginService.execute(body),
  });
}
