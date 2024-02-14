import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    private async comparePasswords(userPassword: string, currentPassword: string) {
        return await argon2.verify(userPassword, currentPassword);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async validateCredentials({ username, password }: { username: string; password: string; }): Promise<User> {
        const user = await this.findOneByUsername(username);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const areEqual = await this.comparePasswords(user.password, password);

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    async create({ username, password }: { username: string; password: string; }): Promise<User> {
        const userInDb = await this.findOneByUsername(username);
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const user: User = this.userRepository.create({username, password});

        await this.userRepository.save(user);
        
        return user;
    }
}
