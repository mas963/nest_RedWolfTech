import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        UsersModule,
        ArticleModule,
        DatabaseModule,
        AuthModule],
    controllers: [AppController],
})
export class AppModule { }
