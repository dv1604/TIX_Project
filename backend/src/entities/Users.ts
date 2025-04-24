import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Length, Matches, MinLength, minLength } from 'class-validator';
import {randomBytes} from 'crypto';
import { genSalt, hash } from 'bcrypt';
import { Booking } from "./Booking";

@Entity()
export class Users{

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    name : string

    @Column({type : 'varchar' , unique : true})
    phoneNumber : string

    @Column({type:"varchar",unique : true})
    @IsEmail({},{message:'Invalid email'}) 
    email :  string

    @Column()
    @MinLength(6,{message : 'Password should be of atleast 6 character'})
    password : string

    @OneToMany(() => Booking , (booking) => booking.user)
    bookings : Booking[]

    @BeforeInsert()
    async generateAndHashPassword(){

       const generateSalt =  await genSalt();
       this.password = await hash(this.password , generateSalt);
    }

}