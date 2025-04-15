import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Theatre } from "./Theatre";
import { Slot } from "./Slot";
import { CityShowing } from "./CityShowing";

@Entity()
export class Screens{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    price : number

    @ManyToOne(() => CityShowing , (cityShowing) => cityShowing.screens)
    @JoinColumn({name : "cityShowingId"})
    cityShowing : CityShowing

    @OneToMany(() => Slot , (slot) =>  slot.screen)
    slots : Slot[]


}