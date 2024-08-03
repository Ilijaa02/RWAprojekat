import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { UpdateResourceDto } from './dtos/update-resource.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('resources')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createResourceDto: CreateResourceDto, @Req() req) {
        const username = req.user.username;
        return this.resourceService.create(createResourceDto, username);
    }

    @Get()
    findAll() {
        return this.resourceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.resourceService.findOne(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id: number, @Body() updateResourceDto: UpdateResourceDto) {
        return this.resourceService.update(id, updateResourceDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.resourceService.remove(id);
    }
}
