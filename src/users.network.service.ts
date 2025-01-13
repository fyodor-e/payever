import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

@Injectable()
export class UsersNetworkService {
  constructor(private readonly httpService: HttpService) {}

  async getUser(id: number): Promise<User> {
    const {
      data: { data: user },
    } = await this.httpService.axiosRef.get<{ data: User }>(
      `https://reqres.in/api/users/${id}`,
    );
    return user;
  }
}
