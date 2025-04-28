import React from 'react';
import movie1 from '../../../assests/spiderman.png'
import movie2 from '../../../assests/tenet.png'
import movie3 from '../../../assests/john_wick.png'
import movie4 from '../../../assests/avengers.png'
import { Box } from '@mui/material';
import MovieTransaction from '../MovieTransaction';
import ASSESTS from '../../../assests';
import { useGetBookingHistoryQuery } from '../../../store/features/Booking/bookingApi';

const TransactionList = () => {

    const {data,isLoading} = useGetBookingHistoryQuery();

    console.log(data);

    const allTickets = data?.map((booking)=>{
        return {
            title: booking.movie_title,
            img: booking.movie_poster,
            day: `${booking.booking_day}, ${booking.booking_date}, ${booking.booking_year}, ${booking.slot_time}`,
            venue: booking.theatre_location,
            screen: booking.screen_name,
            status: booking.payment_status
        }
    })
    
   
  return (
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        gap:'24px'
    }}>
        {allTickets?.map((movie,index) => (
            <MovieTransaction 
            key={index} 
            movies={movie}
            isLast={index === allTickets.length-1}/>
        ))}
    </Box>
  )
}

export default TransactionList
