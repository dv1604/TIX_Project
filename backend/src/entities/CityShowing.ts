import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Movies } from "./Movies";
import { Days } from "./Days";
import { Cities } from "./Cities";
import { Theatre } from "./Theatre";
import { Screens } from "./Screens";

@Entity()
export class CityShowing{

    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>Movies,(movie) => movie.cityShowings )
    @JoinColumn({name : "movieId"})
    movie : Movies;

    @ManyToOne(() => Days,(day) => day.cityShowings)
    @JoinColumn({name : "dayId"})
    day  : Days

    @ManyToOne(()=> Cities , (city) => city.cityShowings)
    @JoinColumn({name : "cityId"})
    city : Cities

    @ManyToOne(()=> Theatre , (theatre) => theatre.cityShowings)
    @JoinColumn({name : "theatreId"})
    theatre : Theatre

    @OneToMany(() => Screens , (screen) => screen.cityShowing)
    screens : Screens[]


}