import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/entities/user/user.service';
import { CreateUserDto } from '../entities/user/dtos/create-user.dto';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService, private readonly userService: UsersService) { }

    async validateUser(username: string, password: string): Promise<string | null> {
        const user = await this.userService.findOneByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...userData } = user;
            return this.jwtService.sign(userData);
        }
        return null;
    }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { email, username, password } = createUserDto;
        const existingUser = await this.userService.findOneByUsername(username);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUserDto = {
            ...createUserDto,
            password: hashedPassword
        };

        const newUser = await this.userService.create(newUserDto);

        return newUser;
    }

    async deleteUser(username: string): Promise<void>{
        await this.userService.removeByUsername(username);
    }
}
