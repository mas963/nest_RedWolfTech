import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./article.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    body: string;

    @ManyToOne(type => Article, article => article.comments)
    article: Article;
}