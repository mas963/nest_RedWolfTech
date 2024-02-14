import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string) {
        const user = await this.usersService.validateCredentials({
            username,
            password: pass
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    async signUp(username: string, pass: string) {
        const user = await this.usersService.create({ username, password: pass });
        if (!user) {
            throw new InternalServerErrorException();
        }
        delete user.password;
        return user;
    }

    validateToken(token: string) {
        return this.jwtService.verify(token, {
            secret : process.env.JWT_SECRET_KEY
        });
    }
}
