import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ResourceModule } from './entities/resource/resource.module';
import { RequestModule } from './entities/request/request.module';
import { ResponseModule } from './entities/response/response.module';
import { UserModule } from './entities/user/user.module';
import { Response } from './entities/response/response.entity';
import { Request } from './entities/request/request.entity';
import { User } from './entities/user/user.entity';
import { Resource } from './entities/resource/resource.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mypassword',
      database: 'postgres',
      entities: [Response, Request, User, Resource],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ResourceModule,
    RequestModule,
    ResponseModule,
    UserModule
  ],
})
export class AppModule {}
