import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { Response } from '../response/response.entity';
import { Request } from '../request/request.entity';
import { Resource } from '../resource/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Response, Request, Resource])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
