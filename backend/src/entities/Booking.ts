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
    @JoinColumn({name : " userId"})
    user : Users

    @ManyToOne(() => Movies, (movies) => movies.bookings)
    @JoinColumn({name : "movieId"})
    movie : Movies

    @ManyToOne(() => Theatre , (theatre) => theatre.bookings)
    @JoinColumn({name : "theatreId"})
    theatre : Theatre

    @ManyToOne(() => Screens , (screen) => screen.bookings)
    @JoinColumn({name : "screenId"})
    screen : Screens

    @ManyToOne(() => Slot, (slot) => slot.bookings)
    @JoinColumn({name : "slotId"})
    slot : Slot

    @OneToMany(() => Seats , (seat) => seat.booking)
    seats : Seats[]

    @Column()
    bookingDate : string

    @Column()
    bookingDay : string

    @Column()
    bookingYear : number

    @Column()
    movieTitle : string

    @Column()
    moviePoster : string

    @Column()
    theatreName : string

    @Column()
    theatreLocation : string

    @Column()
    theatreChain : string

    @Column()
    screenName : string

    @Column()
    slotTime : string

    @Column()
    ticketPrice : number

    @Column()
    totalAmount : number

    @Column({type : 'enum' , enum : PaymentStatus , default : PaymentStatus.PENDING})
    paymmentStatus : PaymentStatus;

    @Column({nullable : true})
    transactionId : string

    @CreateDateColumn()
    createdAt : Date


}