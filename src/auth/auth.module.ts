import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: '0NOml3z9FMfmpgX',
    signOptions: { expiresIn: '5d' },
  }),
    TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule { }
