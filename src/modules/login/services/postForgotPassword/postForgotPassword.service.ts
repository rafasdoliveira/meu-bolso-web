import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { PostForgotPasswordInputDto } from './postForgotPassword.dto';

class PostForgotPasswordService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(body: PostForgotPasswordInputDto): Promise<void> {
    await this.api.post('/auth/forgot-password', body);
  }
}

const postForgotPasswordService = new PostForgotPasswordService(http);
export { postForgotPasswordService, PostForgotPasswordService };
