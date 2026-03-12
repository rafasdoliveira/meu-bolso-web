import { http } from '@shared/api/http';
import { AxiosInstance } from 'axios';
import { PostRegisterInputDto, PostRegisterOutputDto } from './postRegister.dto';

class PostRegisterService {
  constructor(private readonly api: AxiosInstance) {}

  async execute(body: PostRegisterInputDto): Promise<PostRegisterOutputDto> {
    const response = await this.api.post<PostRegisterOutputDto>('/auth/register', body);
    return response.data;
  }
}

const postRegisterService = new PostRegisterService(http);
export { postRegisterService, PostRegisterService };
