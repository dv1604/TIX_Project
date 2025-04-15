import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityShowing } from "./CityShowing";

@Entity()
export class Days{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    dayOffset: number;

    @OneToMany(() => CityShowing , (cityShowing) => cityShowing.day)
    cityShowings : CityShowing[];

}