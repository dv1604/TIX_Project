import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Slot } from "./Slot";
import { Booking } from "./Booking";

export enum SeatStatus {
    AVAILABLE = "Available",
    BOOKED = "Booked",
  }

@Entity()
export class Seats{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    label: string;

    @Column({ type: 'enum', enum: SeatStatus, default: SeatStatus.AVAILABLE })
    status : string;

    @ManyToOne(() => Slot , (slot)=> slot.seats)
    @JoinColumn({name : "slotId"})
    slot : Slot;

    @ManyToOne(() => Booking , (booking) => booking.seats)
    @JoinColumn({name: "bookingId"})
    booking : Booking

} 