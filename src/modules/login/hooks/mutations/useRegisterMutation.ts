import { useMutation } from '@tanstack/react-query';
import { postRegisterService } from '../../services/postRegister/postRegister.service';
import { PostRegisterInputDto } from '../../services/postRegister/postRegister.dto';

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (body: PostRegisterInputDto) => postRegisterService.execute(body),
  });
}
