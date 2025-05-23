import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Cities } from "../entities/Cities";
import { Screens } from "../entities/Screens";
import { Theatre } from "../entities/Theatre";
import { CityShowing } from "../entities/CityShowing";
import { Days } from "../entities/Days";

const screenRepo = AppDataSource.getRepository(Screens);
const dayRepo = AppDataSource.getRepository(Days);
const cityRepo = AppDataSource.getRepository(Cities);
const cityShowingRepo = AppDataSource.getRepository(CityShowing);

export const getfilterOptions = async (req: Request, res: Response) => {

    const movieId = parseInt(req.params.movieId);

    const day = parseInt(req.query.day as string);
    const city = req.query.city as string;

    
    
    
    try {

        const theatreFound = await cityShowingRepo.find({
            where : {movie : {
                id : movieId
            },
            day :{
                day_offset : day
            },
            city:{
                name : city
            }},
            relations : {
                theatre : true,
                screens : true
            }
        })

        const screenNames = theatreFound.map((theatre,index) => {
            return theatre.screens.map((screen) => {
                return screen.name
            })
        });

        const chains = theatreFound.map((theatre,index) => {
            return theatre.theatre.chain
        });

        const cities = await cityRepo
            .createQueryBuilder("cities")
            .select("DISTINCT cities.name", "name")
            .getRawMany();

        res.status(200).json({
            screenNames: [... new Set(screenNames.flat())],
            chains: [... new Set(chains)],
            cities: cities.map(city => city.name)
        });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
}