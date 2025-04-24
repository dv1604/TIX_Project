import { Seat } from "../types/Seats";

export const seatLayout = (seats : Seat[], rows = 8 , cols = 20) : Seat[][] => {

    const grid : Seat[][] = [];

    for(let i =0 ; i < rows ; i++){
        grid.push(seats.slice(i*cols,((i+1)*cols)));
    }
    return grid;

}