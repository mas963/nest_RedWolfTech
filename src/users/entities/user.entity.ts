import { IsEmail } from "class-validator";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from 'argon2';
import { Article } from "../../article/entities/article.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    image: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @OneToMany(type => Article, article => article.author)
    articles: Article[];
}
