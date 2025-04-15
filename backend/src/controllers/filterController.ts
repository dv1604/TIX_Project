import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Cities } from "../entities/Cities";
import { Screens } from "../entities/Screens";
import { Theatre } from "../entities/Theatre";

const screenRepo = AppDataSource.getRepository(Screens);
const theatreRepo = AppDataSource.getRepository(Theatre);
const cityRepo = AppDataSource.getRepository(Cities);

export const getfilterOptions = async (req: Request, res: Response) => {
    try {

        const screenNames = await screenRepo
            .createQueryBuilder("screens")
            .select("DISTINCT screens.name", "name")
            .getRawMany();

        const chains = await theatreRepo
            .createQueryBuilder("theatre")
            .select("DISTINCT theatre.chain", "chain")
            .getRawMany();

        const cities = await cityRepo
            .createQueryBuilder("cities")
            .select("DISTINCT cities.name", "name")
            .getRawMany();

        res.status(200).json({
            screenNames: screenNames.map(screen => screen.name),
            chains: chains.map(chain => chain.chain),
            cities: cities.map(city => city.name)
        });

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
        return
    }
}