import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './resource.entity';
import { User } from '../user/user.entity';
import { Request } from '../request/request.entity';
import { Response } from '../response/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, User, Request, Response])],
  providers: [ResourceService],
  controllers: [ResourceController],
})
export class ResourceModule {}
