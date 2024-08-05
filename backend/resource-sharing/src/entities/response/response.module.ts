import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { Response } from './response.entity';
import { User } from '../user/user.entity';
import { Request } from '../request/request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, User, Request])],
  providers: [ResponseService],
  controllers: [ResponseController],
})
export class ResponseModule {}
