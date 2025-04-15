import { Seats } from "../entities/Seats";

export const generateSeats = () : Seats[] => {

    const rows= 8;
    const columns = 20;
    const seats : Seats[] = [];
    
    for (let row = 0; row < rows; row++) {
        const rowChar = String.fromCharCode(65 + row); //Alphabets
        for (let col = 1; col <= columns; col++) {
          const seat = new Seats();
          seat.label = `${rowChar}${col}`;
          seat.status = 'Available';
          seats.push(seat);
        }
      }
    
      return seats;

}