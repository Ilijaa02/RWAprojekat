import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dtos/create-response.dto';
import { UpdateResponseDto } from './dtos/update-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('responses')
export class ResponseController {
    constructor(private readonly responseService: ResponseService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createResponseDto: CreateResponseDto, @Req() req) {
        const username = req.user.username;
        return this.responseService.create(createResponseDto, username);
    }

    @Get()
    findAll() {
        return this.responseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.responseService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateResponseDto: UpdateResponseDto) {
        return this.responseService.update(+id, updateResponseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.responseService.remove(+id);
    }

    @Get('user/:username')
    findResponsesForUser(@Param('username') username: string) {
        return this.responseService.findResponsesForUser(username);
    }

    @Get('received/:username')
    findResponsesSentToUser(@Param('username') username: string) {
        return this.responseService.findResponsesSentToUser(username);
    }

    @UseGuards(JwtAuthGuard)
    @Post('rate/:userId')
    rateUser(@Param('userId') userId: string, @Body('rating') rating: number, @Body('responseId') responseId: number) {
        return this.responseService.rateUser(+userId, rating, responseId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('unread-count/:username')
    async getUnreadCount(@Param('username') username: string): Promise<number> {
        return this.responseService.countUnreadResponsesForUsername(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id/read')
    async markAsRead(@Param('id') id: number): Promise<void> {
        return this.responseService.markAsRead(id);
    }
}
