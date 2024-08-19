import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';
import { CreateResponseDto } from './dtos/create-response.dto';
import { User } from '../user/user.entity';
import { Request } from '../request/request.entity';
import { UpdateResponseDto } from './dtos/update-response.dto';

@Injectable()
export class ResponseService {
    constructor(
        @InjectRepository(Response)
        private responseRepository: Repository<Response>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,
    ) { }

    async create(createResponseDto: CreateResponseDto, username: string): Promise<Response> {
        const user = await this.userRepository.findOne({ where: { username } });
        const request = await this.requestRepository.findOne({ where: { id: createResponseDto.requestId } });
        const response = this.responseRepository.create({
            ...createResponseDto,
            user,
            request,
        });
        return this.responseRepository.save(response);
    }

    async findAll(): Promise<Response[]> {
        return this.responseRepository.createQueryBuilder('response')
            .leftJoinAndSelect('response.request', 'request')
            .leftJoinAndSelect('request.user', 'user')
            .getMany();
    }

    async findOne(id: number): Promise<Response> {
        return this.responseRepository.createQueryBuilder('response')
            .leftJoinAndSelect('response.request', 'request')
            .leftJoinAndSelect('request.user', 'user')
            .where('response.id = :id', { id })
            .getOne();
    }

    async update(id: number, updateResponseDto: UpdateResponseDto): Promise<Response> {
        await this.responseRepository.update(id, updateResponseDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.responseRepository.delete(id);
    }
}
