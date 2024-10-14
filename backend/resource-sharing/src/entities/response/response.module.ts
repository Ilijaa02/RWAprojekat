import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { Response } from './response.entity';
import { User } from '../user/user.entity';
import { Request } from '../request/request.entity';
import { Resource } from '../resource/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, User, Request, Resource])],
  providers: [ResponseService],
  controllers: [ResponseController],
})
export class ResponseModule {}
