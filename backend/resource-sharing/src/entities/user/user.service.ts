import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import { CreateUserDto } from 'src/entities/user/dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { username } });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { email, username, password } = createUserDto;
        const newUser = this.usersRepository.create({ email, username, password, role: UserRole.USER });
        return this.usersRepository.save(newUser);
    }

    async removeByUsername(username: string): Promise<void> {
        await this.usersRepository.delete({ username });
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
}
