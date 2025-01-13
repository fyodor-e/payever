import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { User } from './users.network.service';

@Injectable()
export class AvatarsNetworkService {
  constructor(private readonly httpService: HttpService) {}

  async getAvatar(id: number): Promise<string> {
    const {
      data: { data: user },
    } = await this.httpService.axiosRef.get<{ data: User }>(
      `https://reqres.in/api/users/${id}`,
    );
    return Buffer.from(user.avatar).toString('base64');
  }
}
