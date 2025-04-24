export type bookingResponse = {
    id : string;
    bookingDate: string;
    bookingDay: string;
    bookingYear: number,
    movieTitle: string,
    moviePoster: string;
    theatreName: string;
    theatreLocation: string;
    theatreChain: string;
    screenName: string;
    slotTime: string;
    ticketPrice: number;
    totalAmount: number;
    paymmentStatus: string;
    transactionId: string;
}