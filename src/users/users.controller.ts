import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { GetUserDto } from './dto/get_user.dto';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @HttpCode(201)
    async create(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
        const createdUser = await this.usersService.create(createUserDto);
        return createdUser;
    }

    @Get()
    async findAll(): Promise<GetUserDto[]> {
        const users = this.usersService.findAll();
        return users;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<GetUserDto> {
        const user = this.usersService.findOne(id); 
        return user;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
