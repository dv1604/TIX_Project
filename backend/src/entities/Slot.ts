import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Screens } from "./Screens";
import { Seats } from "./Seats";

@Entity()
export class Slot{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    time: string;

    @ManyToOne(() =>  Screens , (screen) => screen.slots)
    @JoinColumn({name : "screenId"})
    screen : Screens;

    @OneToMany(()=>Seats ,(seat) => seat.slot)
    seats : Seats[];

}