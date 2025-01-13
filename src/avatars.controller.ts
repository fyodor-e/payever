import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AvatarsNetworkService } from './avatars.network.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar, AvatarDocument } from './schemas/avatar.schema';
import crypto from 'crypto';

@Controller('api/user')
export class AvatarsController {
  constructor(
    private readonly avatarsNetworkService: AvatarsNetworkService,
    @InjectModel(Avatar.name) private avatarModel: Model<AvatarDocument>,
  ) {}

  @Get(':id/avatar')
  async getAvatar(@Param() params): Promise<string> {
    const avatar = await this.avatarModel.find({ id: params.id }).exec();
    if (avatar.length) return avatar[0].avatar;
    const avatarFromNetwork = await this.avatarsNetworkService.getAvatar(
      params.id,
    );
    const createdAvatar = new this.avatarModel({
      id: params.id,
      hash: crypto.createHash('md5').update(avatarFromNetwork).digest('hex'),
      avatar: avatarFromNetwork,
    });
    createdAvatar.save();
    return avatarFromNetwork;
  }

  @Delete(':id/avatar')
  deleteAvatar(@Param() params) {
    this.avatarModel.deleteOne({ id: params.id });
  }
}
