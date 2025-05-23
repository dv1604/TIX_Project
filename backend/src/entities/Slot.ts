import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Screens } from "./Screens";
import { Seats } from "./Seats";
import { Booking } from "./Booking";

@Entity()
export class Slot{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    time: string;

    @ManyToOne(() =>  Screens , (screen) => screen.slots)
    @JoinColumn({name : "screen_id"})
    screen : Screens;

    @OneToMany(()=>Seats ,(seat) => seat.slot)
    seats : Seats[];

    @OneToMany(() => Booking ,(booking) => booking.slot)
    bookings : Booking[]

}