import React from 'react';
import { Box } from '@mui/material';
import MovieTransaction from '../MovieTransaction';
import ASSESTS from '../../../assests';

const activeTickets = [
    { title: 'spiderman:no way home', img: ASSESTS.images.spiderman, day: 'Thursday, December 16, 2021, 14:40', venue: 'Grand Indonesia CGV', screen: 'Regular 2D', status: 'successful' },
    { title: 'tenet', img: ASSESTS.images.tenet, day: 'Thursday, December 16, 2021, 14:40', venue: 'Grand Indonesia CGV', screen: 'Regular 2D', status: 'successful' },
    { title: 'tenet', img: ASSESTS.images.tenet, day: 'Thursday, December 16, 2021, 14:40', venue: 'Grand Indonesia CGV', screen: 'Regular 2D', status: 'Failed' },
    { title: 'john wick: chapter 3 - parabellum', img: ASSESTS.images.john_wick, day: 'Thursday, December 16, 2021, 14:40', venue: 'Grand Indonesia CGV', screen: 'Regular 2D', status: 'successful' },
    { title: 'avengers: endgame', img: ASSESTS.images.avengers, day: 'Thursday, December 16, 2021, 14:40', venue: 'Grand Indonesia CGV', screen: 'Regular 2D', status: 'successful' },
];

// Filter only successful movies
const successfulTickets = activeTickets.filter(movie => movie.status === 'successful');

const ActiveTickets = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {successfulTickets.map((movie, index) => (
                <MovieTransaction 
                key={index} 
                movies={movie} 
                showStatus={false}
                isLast={index === successfulTickets.length-1} />
            ))}
        </Box>
    )
}

export default ActiveTickets;
