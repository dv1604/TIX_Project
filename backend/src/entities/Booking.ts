import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Movies } from "./Movies";
import { Users } from "./Users";
import { Screens } from "./Screens";
import { Theatre } from "./Theatre";
import { Slot } from "./Slot";
import { Seats } from "./Seats";

export enum PaymentStatus {
    PENDING  = "Pending",
    SUCCESS = "Sucess",
    FAILED = "Failed"
}

@Entity()
export class Booking{
    @PrimaryColumn()
    id : string

    @ManyToOne(() => Users , (user) => user.bookings)
    @JoinColumn({name : " user_id"})
    user : Users

    @ManyToOne(() => Movies, (movies) => movies.bookings)
    @JoinColumn({name : "movie_id"})
    movie : Movies

    @ManyToOne(() => Theatre , (theatre) => theatre.bookings)
    @JoinColumn({name : "theatre_id"})
    theatre : Theatre

    @ManyToOne(() => Screens , (screen) => screen.bookings)
    @JoinColumn({name : "screen_id"})
    screen : Screens

    @ManyToOne(() => Slot, (slot) => slot.bookings)
    @JoinColumn({name : "slot_id"})
    slot : Slot

    @OneToMany(() => Seats , (seat) => seat.booking)
    seats : Seats[]

    @Column()
    booking_date : string

    @Column()
    booking_day : string

    @Column()
    booking_year : number

    @Column()
    movie_title : string

    @Column()
    movie_poster : string

    @Column()
    theatre_name : string

    @Column()
    theatre_location : string

    @Column()
    theatre_chain : string

    @Column()
    screen_name : string

    @Column()
    slot_time : string

    @Column()
    ticket_price : number

    @Column()
    total_amount : number

    @Column({type : 'enum' , enum : PaymentStatus , default : PaymentStatus.PENDING})
    payment_status : PaymentStatus;

    @Column({nullable : true})
    transactionId : string

    @CreateDateColumn()
    createdAt : Date


}