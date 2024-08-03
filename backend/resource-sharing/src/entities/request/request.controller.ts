import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dtos/create-request.dto';
import { UpdateRequestDto } from './dtos/update-request.dto';
import { AuthGuard } from '@nestjs/passport';

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
}
