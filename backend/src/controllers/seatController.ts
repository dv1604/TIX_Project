import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Seats } from "../entities/Seats";

const seatRepo = AppDataSource.getRepository(Seats);

export const getSeats = async (req: Request, res: Response) => {

    try {
        const { slotId } = req.params;

        const seats = await seatRepo.find({
            where: {
                slot: {
                    id: Number(slotId)
                }
            },
            order : {
                id : 'ASC'
            }
        })

        if(!seats){
            res.status(404).json({message : "seats not found"});
            return;
        }

        res.status(200).json(seats)
    }catch(err){

        res.status(500).json({message : "Internal Server Error"});

    }

}