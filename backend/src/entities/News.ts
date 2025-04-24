import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Keyword } from "./Keyword";

export enum NewsCategory {
    Spotlight = 'Spotlight',
    News = 'News',
    Video = 'Video',
  }

@Entity()
export class News{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        type: "enum",
        enum: NewsCategory,
      })
    category : NewsCategory;

    @Column()
    description : string;

    @Column()
    image : string;

    @Column()
    heading : string;

    @Column()
    releaseDate : string;

    @Column({ nullable: true })
    videoUrl?: string;
    
    @ManyToMany(() => Keyword ,{cascade : true , eager : true})
    @JoinTable()
    keywords : Keyword[];
}