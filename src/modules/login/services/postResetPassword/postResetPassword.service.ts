import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { PostResetPasswordInputDto } from './postResetPassword.dto';

class PostResetPasswordService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(body: PostResetPasswordInputDto): Promise<void> {
    await this.api.post('/auth/reset-password', body);
  }
}

const postResetPasswordService = new PostResetPasswordService(http);
export { postResetPasswordService, PostResetPasswordService };
