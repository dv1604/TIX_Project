import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityShowing } from "./CityShowing";

@Entity()
export class Days{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    day_offset: number;

    @OneToMany(() => CityShowing , (cityShowing) => cityShowing.day)
    cityShowings : CityShowing[];

}