import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./News";

@Entity()
export class Keyword{

    @PrimaryGeneratedColumn()
    id :  number;

    @Column()
    name : string;

    @ManyToMany(() => News, (news) => news.keywords)
    news : News[];

}