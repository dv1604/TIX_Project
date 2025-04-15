import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Slot } from "./Slot";

@Entity()
export class Seats{

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    label: string;

    @Column()
    status : string;

    @ManyToOne(() => Slot , (slot)=> slot.seats)
    @JoinColumn({name : "slotId"})
    slot : Slot;

} 