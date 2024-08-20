import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dtos/create-response.dto';
import { UpdateResponseDto } from './dtos/update-response.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

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
}
