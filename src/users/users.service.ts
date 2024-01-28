import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUserDto } from './dto/get_user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<GetUserDto> {
        const newUser = this.userRepository.create(createUserDto);
        const savedUser = await this.userRepository.save(newUser);

        const getUserDto: GetUserDto = {
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            image: savedUser.image
        };

        return getUserDto;
    }

    async findAll(): Promise<GetUserDto[]> {
        const users = await this.userRepository.find({
            order: {
                username: "ASC",
            }
        });

        const usersDtoArray: GetUserDto[] = users.map(user => {
            const userDto: GetUserDto = {
                id: user.id,
                username: user.username,
                email: user.email,
                image: user.image
            };
            return userDto;
        });

        return usersDtoArray;
    }

    async findOne(id: string): Promise<GetUserDto> {
        const user = await this.userRepository.findOne({ where: { id } });
        const userDto: GetUserDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            image: user.image
        };

        return userDto;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
