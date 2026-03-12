import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { PostLoginInputDto, PostLoginOutputDto } from './postLogin.dto';

class PostLoginService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(body: PostLoginInputDto): Promise<PostLoginOutputDto> {
    const response = await this.api.post<PostLoginOutputDto>('/auth/login', body);
    return response.data;
  }
}

const postLoginService = new PostLoginService(http);
export { postLoginService, PostLoginService };
