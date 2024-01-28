import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Comment } from '../article/entities/comment.entity';
import { Article } from '../article/entities/article.entity';
import { Category } from '../article/entities/category.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],

            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('DATABASE_URL'),
                entities: [User, Comment, Article, Category],
                synchronize: true
            }),
        }),
    ],
})

export class DatabaseModule {}
