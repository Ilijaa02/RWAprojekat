import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/entities/user/user.service';
import { UserModule } from 'src/entities/user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'sdf345WER765',
      signOptions: {expiresIn: '1h'},
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
