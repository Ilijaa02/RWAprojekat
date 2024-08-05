import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Resource } from '../resource/resource.entity';
import { Request } from './request.entity';
import { Response } from '../response/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Request, User, Resource, Response])],
  providers: [RequestService],
  controllers: [RequestController],
})
export class RequestModule {}
