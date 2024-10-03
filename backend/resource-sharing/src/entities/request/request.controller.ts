import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dtos/create-request.dto';
import { UpdateRequestDto } from './dtos/update-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { Patch } from '@nestjs/common';

@Controller('requests')
export class RequestController {
    constructor(private readonly requestService: RequestService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createRequestDto: CreateRequestDto, @Req() req) {
        const username = req.user.username;
        return this.requestService.create(createRequestDto, username);
    }

    @Get()
    findAll() {
        return this.requestService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.requestService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: number, @Body() updateRequestDto: UpdateRequestDto) {
        return this.requestService.update(id, updateRequestDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.requestService.remove(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('for-user/:username')
    async findRequestsForUser(@Param('username') username: string, @Req() req) {
        return this.requestService.findRequestsForUser(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('from-user/:username')
    findRequestsByUser(@Param('username') username: string) {
        return this.requestService.findRequestsByUser(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('unread-count/:username')
    async getUnreadCount(@Param('username') username: string): Promise<number> {
        return this.requestService.countUnreadRequestsForUsername(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/read')
    async markAsRead(@Param('id') id: number): Promise<void> {
        return this.requestService.markAsRead(id);
    }
}
