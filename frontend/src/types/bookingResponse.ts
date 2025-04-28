export type bookingResponse = {
    id : string;
    booking_date: string;
    booking_day: string;
    booking_year: number,
    movie_title: string,
    movie_poster: string;
    theatre_name: string;
    theatre_location: string;
    theatre_chain: string;
    screen_name: string;
    slot_time: string;
    ticket_price: number;
    total_amount: number;
    payment_status: string;
    transactionId: string;
}