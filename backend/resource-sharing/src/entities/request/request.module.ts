import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Resource } from '../resource/resource.entity';
import { Request } from './request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, User, Resource])],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
