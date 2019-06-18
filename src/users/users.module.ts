import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MulterModule } from '@nestjs/platform-express';
import { UsersController } from './users.controller';
import { MongooseModule } from "@nestjs/mongoose";
import {UserSchema} from '../users/schema/user.schema';
@Module({
  imports:[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  MulterModule.register({
    dest: './uploads'
  })],
  providers: [UserService],
  controllers: [UsersController]
})
export class UsersModule {

}


