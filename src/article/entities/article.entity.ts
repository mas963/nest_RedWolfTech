import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from './comment.entity';
import { Category } from "./category.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Article {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    thumbnail: string;

    @Column()
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(type => User, user => user.articles)
    author: User;

    @OneToMany(type => Comment, comment => comment.article)
    comments: Comment[];

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}
