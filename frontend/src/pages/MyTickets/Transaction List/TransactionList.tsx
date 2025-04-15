import React from 'react';
import movie1 from '../../../assests/spiderman.png'
import movie2 from '../../../assests/tenet.png'
import movie3 from '../../../assests/john_wick.png'
import movie4 from '../../../assests/avengers.png'
import { Box } from '@mui/material';
import MovieTransaction from '../MovieTransaction';
import ASSESTS from '../../../assests';

const TransactionList = () => {

    const activeTickets = [{
        title:'spiderman:no way home',
        img:ASSESTS.images.spiderman,
        day:'Thursday, December 16, 2021, 14:40',
        venue:'Grand Indonesia CGV',
        screen:'Regular 2D',
        status:'successful'
    },
    {
        title:'tenet',
        img:ASSESTS.images.tenet,
        day:'Thursday, December 16, 2021, 14:40',
        venue:'Grand Indonesia CGV',
        screen:'Regular 2D',
        status:'successful'
    },
    {
        title:'tenet',
        img:ASSESTS.images.tenet,
        day:'Thursday, December 16, 2021, 14:40',
        venue:'Grand Indonesia CGV',
        screen:'Regular 2D',
        status:'Failed'
    },
    {
        title:'john wick: chapter 3 - parabellum',
        img:ASSESTS.images.john_wick,
        day:'Thursday, December 16, 2021, 14:40',
        venue:'Grand Indonesia CGV',
        screen:'Regular 2D',
        status:'successful'
    },
    {
        title:'avengers: endgame',
        img:ASSESTS.images.avengers,
        day:'Thursday, December 16, 2021, 14:40',
        venue:'Grand Indonesia CGV',
        screen:'Regular 2D',
        status:'successful'
    },]

  return (
    <Box sx={{
        display:'flex',
        flexDirection:'column',
        gap:'24px'
    }}>
        {activeTickets.map((movie,index) => (
            <MovieTransaction 
            key={index} 
            movies={movie}
            isLast={index === activeTickets.length-1}/>
        ))}
    </Box>
  )
}

export default TransactionList
