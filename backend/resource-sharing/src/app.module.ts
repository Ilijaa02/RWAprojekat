import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ResourceModule } from './entities/resource/resource.module';
import { UserController } from './entities/user/user.controller';
import { RequestModule } from './entities/request/request.module';

@Module({
  controllers: [AppController, UserController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mypassword',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ResourceModule,
    RequestModule,
  ],
})
export class AppModule {}
