import React from 'react';
import { Box } from '@mui/material';
import MovieTransaction from '../MovieTransaction';
import ASSESTS from '../../../assests';
import { useGetBookingHistoryQuery } from '../../../store/features/Booking/bookingApi';


const ActiveTickets = () => {

    const { data, isLoading } = useGetBookingHistoryQuery();

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    const allactiveTickets = data?.map((booking) => {
        const bookingDate = new Date(`${booking.booking_date}, ${booking.booking_year}`);

        return {
            title: booking.movie_title,
            img: booking.movie_poster,
            day: `${booking.booking_day}, ${booking.booking_date}, ${booking.booking_year}, ${booking.slot_time}`,
            venue: booking.theatre_location,
            screen: booking.screen_name,
            status: booking.payment_status,
            date: bookingDate
        };
    });

    // ✅ Filter: successful & booking date today or future
    const successfulTickets = allactiveTickets
        ?.filter(movie => movie.status === 'Sucess' && movie.date >= today);
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {successfulTickets?.map((movie, index) => (
                <MovieTransaction
                    key={index}
                    movies={movie}
                    showStatus={false}
                    isLast={index === successfulTickets.length - 1} />
            ))}
        </Box>
    )
}

export default ActiveTickets;
