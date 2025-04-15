import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityShowing } from "./CityShowing";

@Entity()
export class Cities{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name  : string;

    @OneToMany(() => CityShowing , (cityShowing) => cityShowing.city)
    cityShowings : CityShowing[];

}