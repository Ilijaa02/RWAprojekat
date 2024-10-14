import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Response } from './response.entity';
import { CreateResponseDto } from './dtos/create-response.dto';
import { User } from '../user/user.entity';
import { Request } from '../request/request.entity';
import { UpdateResponseDto } from './dtos/update-response.dto';
import { Resource } from '../resource/resource.entity';

@Injectable()
export class ResponseService {
    constructor(
        @InjectRepository(Response)
        private responseRepository: Repository<Response>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Request)
        private requestRepository: Repository<Request>,
        @InjectRepository(Resource)
        private resourceRepository: Repository<Resource>
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

    async findResponsesForUser(username: string): Promise<Response[]> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new Error('User not found');
        }

        return this.responseRepository
            .createQueryBuilder('response')
            .innerJoinAndSelect('response.request', 'request')
            .innerJoinAndSelect('request.resource', 'resource')
            .innerJoinAndSelect('resource.user', 'resourceOwner')
            .innerJoinAndSelect('request.user', 'requestUser')
            .where('resourceOwner.id = :userId', { userId: user.id })
            .getMany();
    }

    async findResponsesSentToUser(username: string): Promise<Response[]> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new Error('User not found');
        }

        return this.responseRepository
            .createQueryBuilder('response')
            .innerJoinAndSelect('response.request', 'request')
            .innerJoinAndSelect('request.user', 'requestUser')
            .innerJoinAndSelect('response.user', 'responseUser')
            .where('requestUser.id = :userId', { userId: user.id })
            .getMany();
    }

    async rateUser(userId: number, rating: number, responseId: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            throw new Error('User not found');
        }

        user.numberOfRatings += 1;
        user.rating = ((user.rating * (user.numberOfRatings - 1)) + rating) / user.numberOfRatings;
        await this.userRepository.save(user);

        await this.responseRepository.delete(responseId);

        return user;
    }

    async countUnreadResponsesForUsername(username: string): Promise<number> {
        // Pronađi korisnika na osnovu username-a
        const user = await this.userRepository.findOne({ where: { username } });
    
        if (!user) {
            throw new Error('User not found');
        }
    
        // Pronađi sve zahteve koje je korisnik poslao
        const requests = await this.requestRepository.find({
            where: {
                user: user,  // Samo zahtevi koje je korisnik poslao
            },
        });
    
        // Pronađi broj nepročitanih odgovora na te zahteve
        const unreadResponsesCount = await this.responseRepository.count({
            where: {
                request: In(requests.map(request => request.id)),  // Odgovori vezani za ove zahteve
                isRead: false,  // Samo nepročitani odgovori
            },
        });
    
        return unreadResponsesCount;
    }
    
    async markAsRead(id: number): Promise<void> {
        await this.responseRepository.update(id, { isRead: true });
    }

}
