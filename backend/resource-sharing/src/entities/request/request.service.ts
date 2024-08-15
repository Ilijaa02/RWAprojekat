import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Request } from './request.entity';
import { CreateRequestDto } from './dtos/create-request.dto';
import { UpdateRequestDto } from './dtos/update-request.dto';
import { User } from '../user/user.entity';
import { Resource } from '../resource/resource.entity';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Resource)
        private resourceRepository: Repository<Resource>,
    ) { }

    async create(createRequestDto: CreateRequestDto, username: string): Promise<Request> {
        const user = await this.userRepository.findOne({ where: { username } });
        const resource = await this.resourceRepository.findOne({ where: { id: createRequestDto.resourceId } });
        const request = this.requestRepository.create({
            message: createRequestDto.message,
            user,
            resource,
        });
        return this.requestRepository.save(request);
    }

    async findAll(): Promise<Request[]> {
        return this.requestRepository.find({ relations: ['user', 'resource'] });
    }

    async findOne(id: number): Promise<Request> {
        return this.requestRepository.findOne({ where: { id }, relations: ['user', 'resource'] });
    }

    async update(id: number, updateRequestDto: UpdateRequestDto): Promise<Request> {
        await this.requestRepository.update(id, updateRequestDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.requestRepository.delete(id);
    }

    async findRequestsForUser(username: string): Promise<Request[]> {
        const user = await this.userRepository.findOne({
            where: { username },
            relations: ['resources'] 
        });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        const resources = user.resources;
    
        return this.requestRepository.find({
            where: {
                resource: {
                    id: In(resources.map(resource => resource.id))
                }
            },
            relations: ['user', 'resource']
        });
    }
    
}
