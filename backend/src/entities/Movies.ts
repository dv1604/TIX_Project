import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CityShowing } from "./CityShowing";
import { Booking } from "./Booking";

@Entity()
export class Movies{

    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique :  true})
    title : string;

    @Column()
    genre : string;

    @Column()
    duration :  string;

    @Column()
    rating : string;

    @Column()
    director : string;
    
    @Column()
    image: string;

   @OneToMany(() => CityShowing , (CityShowing) => CityShowing.movie)
   cityShowings : CityShowing[];

   @OneToMany(() => Booking , (Booking) => Booking.movie)
   bookings : Booking[]

}