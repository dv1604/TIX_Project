export type stripePayload = {

    userId : number;
    movieId : number;
    theatreId : number;
    screenId : number;
    slotId : number;
    seatIds : number[];
    dayOffset : number;
    totalAmount : number;

}