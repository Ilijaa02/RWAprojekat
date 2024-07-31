import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from 'src/entities/user/user.entity';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request){
        return req.user;
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto): Promise<User>{
        return this.authService.register(createUserDto);
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request){
        return req.user;
    }

    @Delete('delete')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async delete(@Body('username') username: string): Promise<void>{
        await this.authService.deleteUser(username);
    }

}
