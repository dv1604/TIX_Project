import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Theatre } from "./Theatre";
import { Slot } from "./Slot";
import { CityShowing } from "./CityShowing";
import { Booking } from "./Booking";

@Entity()
export class Screens{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    price : number

    @ManyToOne(() => CityShowing , (cityShowing) => cityShowing.screens)
    @JoinColumn({name : "cityShowing_id"})
    cityShowing : CityShowing

    @OneToMany(() => Slot , (slot) =>  slot.screen)
    slots : Slot[]

    @OneToMany(() => Booking , (booking) => booking.screen)
    bookings : Booking[]


}