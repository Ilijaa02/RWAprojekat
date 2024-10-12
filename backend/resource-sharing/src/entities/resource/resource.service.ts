import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource, ResourceType } from './resource.entity';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(Resource)
        private resourceRepository: Repository<Resource>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createResourceDto: CreateResourceDto, username: string): Promise<Resource> {
        const user = await this.userRepository.findOne({ where: { username } });
        const resource = this.resourceRepository.create({
            ...createResourceDto,
            user,
        });
        return this.resourceRepository.save(resource);
    }

    async findAll(): Promise<Resource[]> {
        return this.resourceRepository.find({ relations: ['user'] });
    }

    async findOne(id: number): Promise<Resource> {
        return this.resourceRepository
            .createQueryBuilder('resource')
            .where('resource.id = :id', { id })
            .leftJoinAndSelect('resource.user', 'user')
            .getOne();
    }

    async update(id: number, updateResourceDto: UpdateResourceDto): Promise<Resource> {
        await this.resourceRepository.update(id, updateResourceDto);
        return this.resourceRepository
            .createQueryBuilder('resource')
            .where('resource.id = :id', { id })
            .leftJoinAndSelect('resource.user', 'user')
            .getOne();
    }

    async remove(id: number): Promise<void> {
        await this.resourceRepository.delete(id);
    }

    async findAllByType(type: ResourceType): Promise<Resource[]> {
        return this.resourceRepository.find({ where: { type }, relations: ['user'] });
    }

    async findAllSortedByUserRating(): Promise<Resource[]> {
        return this.resourceRepository
            .createQueryBuilder('resource')
            .leftJoinAndSelect('resource.user', 'user')
            .orderBy('user.rating', 'DESC')
            .getMany();
    }

}
