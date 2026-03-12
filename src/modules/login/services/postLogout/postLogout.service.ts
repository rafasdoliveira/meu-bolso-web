import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';

class PostLogoutService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(): Promise<void> {
    await this.api.post('/auth/logout');
  }
}

const postLogoutService = new PostLogoutService(http);
export { postLogoutService, PostLogoutService };
