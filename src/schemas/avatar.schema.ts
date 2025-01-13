import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AvatarDocument = HydratedDocument<Avatar>;

@Schema({ collection: 'avatars' })
export class Avatar {
  @Prop()
  id: number;

  @Prop()
  hash: string;

  @Prop()
  avatar: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
