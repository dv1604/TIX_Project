
import { Cities } from './../entities/Cities';
import { AppDataSource } from "../config/database"
import { Days } from "../entities/Days";
import { Movies } from "../entities/Movies"
import { CityShowing } from '../entities/CityShowing';
import { Theatre } from '../entities/Theatre';
import { Screens } from '../entities/Screens';
import { Slot } from '../entities/Slot';
import { Seats } from '../entities/Seats';
import { movies } from './data/movieData';
import { generateSeats } from '../utitlity/generateSeats';


const movieRepo = AppDataSource.getRepository(Movies);
const dayRepo = AppDataSource.getRepository(Days);
const cityRepo = AppDataSource.getRepository(Cities);
const cityShowingRepo = AppDataSource.getRepository(CityShowing);
const theatreRepo = AppDataSource.getRepository(Theatre);
const screenRepo = AppDataSource.getRepository(Screens);
const slotRepo = AppDataSource.getRepository(Slot);
const seatsRepo = AppDataSource.getRepository(Seats);


export const seedMovies = async () => {

    for (const data of movies) {

        const newMovie = movieRepo.create({

            title: data.title,
            genre: data.genre,
            duration: data.duration,
            rating: data.rating,
            director: data.director,
            image: data.image
        })

        await movieRepo.save(newMovie);

        for (const day of data.days) {

            let dayFound = await dayRepo.findOneBy({ dayOffset: day.dayOffset });

            if (!dayFound) {
                const newDay = dayRepo.create({
                    dayOffset: day.dayOffset
                })

                dayFound = await dayRepo.save(newDay);
            }



            for (const city of day.cities) {

                let cityFound = await cityRepo.findOneBy({ name: city.name });

                if (!cityFound) {
                    const newCity = cityRepo.create({
                        name: city.name
                    });

                    cityFound = await cityRepo.save(newCity)
                }

                for (const theatre of city.theatres) {

                    let theatreFound = await theatreRepo.findOneBy({name : theatre.name , location : theatre.location});

                    if(!theatreFound){

                        const newTheatre = theatreRepo.create({
                            name: theatre.name,
                            location: theatre.location,
                            chain: theatre.chain,
                        }
                        )
    
                        theatreFound = await theatreRepo.save(newTheatre);
                    }


                    const cityShowing = cityShowingRepo.create({

                        movie: newMovie,
                        day: dayFound,
                        city: cityFound,
                        theatre : theatreFound
                    })

                    await cityShowingRepo.save(cityShowing);


                    for (const screen of theatre.screens) {

                        const newScreen = screenRepo.create({
                            name: screen.name,
                            price: screen.price,
                            cityShowing : cityShowing
                        })

                        await screenRepo.save(newScreen);

                        for (const slot of screen.slots) {

                            const newSlot = slotRepo.create({
                                screen: newScreen,
                                time: slot.time
                            })

                            await slotRepo.save(newSlot);

                            const seats = generateSeats().map(seat => {
                                seat.slot = newSlot;
                                return seat;
                            });;

                            await seatsRepo.save(seats);


                        }

                    }
                }

            }

        }

    }


}