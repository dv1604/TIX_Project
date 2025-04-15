import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityShowing } from "./CityShowing";
import { Screens } from "./Screens";

@Entity()
export class Theatre{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    location : string;

    @Column()
    chain : string;

    @OneToMany(() => CityShowing , (cityShowing) =>  cityShowing.theatre)
    cityShowings : CityShowing[]

    

}