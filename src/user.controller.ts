import { Controller, Get, Param } from '@nestjs/common';
import { User, UsersNetworkService } from './users.network.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly usersNetworkService: UsersNetworkService) {}

  @Get(':id')
  async getUser(@Param() params): Promise<User> {
    return this.usersNetworkService.getUser(params.id);
  }
}
