import { CityResponse } from './../types/movieResponse';
import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Movies } from "../entities/Movies";
import { DayResponse, MovieResponse } from "../types/movieResponse";

const movieRepo = AppDataSource.getRepository(Movies)
export const cityShowingData = async (req: Request, res: Response) => {

    const movieId = parseInt(req.params.movieId);
    const cityParam = req.query.city as string;
    const dayOffsetParam = req.query.dayOffset;
    const dayOffset = dayOffsetParam ? parseInt(dayOffsetParam as string) : null;
    const chain = req.query.chain as string | undefined;
    const screenName = req.query.screenName as string | undefined;

    try {

        const movie = await movieRepo.findOne({
            where: {
                id: movieId
            },
            relations: {
                cityShowings: {
                    day: true,
                    city: true,
                    theatre: true,
                    screens: {
                        slots: true
                    }
                }
            },
            order: {
                cityShowings: {
                    day: {
                        day_offset: "ASC"
                    }
                }
            }
        })

        // if movie not found
        if (!movie) {

            res.status(404).json({ message: "Movie not Found" });
            return;
        }

        const response: MovieResponse = {
            id : movie.id,
            title: movie.title,
            genre: movie.genre,
            duration: movie.duration,
            rating: movie.rating,
            director: movie.director,
            image: movie.image,
            days: []
        };

        const groupByDay: Record<number, DayResponse> = {};

        movie.cityShowings.filter(showing => {
            const matchCity = cityParam ? showing.city.name === cityParam : true;
            const matchDay = dayOffset !== null ? showing.day.day_offset === dayOffset : true;
            return matchCity && matchDay;
        })
            .forEach(showing => {
                const { day, city, theatre, screens } = showing;

                // Skip this showing entirely if theatre chain doesn't match
                if (chain && theatre.chain !== chain) return;

                // Now filter screens only based on screen name
                const filteredScreens = screens.filter(screen => {
                    return screenName ? screen.name === screenName : true;
                });

                if (filteredScreens.length === 0) return;

                if (!groupByDay[day.day_offset]) {

                    groupByDay[day.day_offset] = {
                        id : day.id,
                        dayOffset: day.day_offset,
                        cities: []
                    };
                }

                const cityGroup = groupByDay[day.day_offset].cities;
                let cityEntry = cityGroup.find(c => c.name === city.name);

                if (!cityEntry) {
                    cityEntry = {

                        id : city.id,
                        name: city.name,
                        theatres: []
                    };

                    cityGroup.push(cityEntry);
                }

                let theatreEntry = cityEntry.theatres.find(t => t.name === theatre.name && t.location === theatre.location);

                if (!theatreEntry) {
                    theatreEntry = {
                        id : theatre.id,
                        name: theatre.name,
                        location: theatre.location,
                        chain: theatre.chain,
                        screens: []
                    };
                    cityEntry.theatres.push(theatreEntry);
                }

                for (const screen of filteredScreens) {

                    theatreEntry.screens.push({
                        id : screen.id,
                        name: screen.name,
                        price: screen.price,
                        slots: screen.slots.map(slot => ({
                            id: slot.id,
                            time: slot.time
                        }))
                    });
                }

            })

        response.days = Object.values(groupByDay);
        // if (response.days.length === 0) {
        //     res.status(404).json({ message: 'No showings Found' });
        //     return;
        // }
        console.log(chain, screenName)
        // console.log(response,response.days[0].cities,response.days[0].cities[0].theatres,response.days[0].cities[0].theatres[0].screens)
        res.status(200).json(response);
        return;

    } catch (err) {

        console.log("ERROR RECIEVED DURING FETCHING WHOLE DATA", err)
        res.status(500).json({ message: "Internal Server Error" });
        return;

    }

}