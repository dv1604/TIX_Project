import { Box, Button, Container, Link, Typography } from '@mui/material'
import React from 'react';
import ASSESTS from '../../assests';
import ComingsoonCard from '../../components/Cards/ComingsoonCard';

const ComingSoon = () => {

    const movies = [{
        img:ASSESTS.images.matrix,
        title:'The Matrix: Resurrections'
    },
    {
        img:ASSESTS.images.resident_evil,
        title:'Resident Evil: Welcome to Raccoon City'
    },
    {
        img:ASSESTS.images.sword,
        title:'Sword Art Online: Progressive - Aria of a Starless Night'
    }]
    
    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', width: '100%',gap:4,justifyItems:'center',alignItems:'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: {xs:'95%',xl:'100%'} }}>
                <Box>
                    <Typography variant='h3' sx={{ mb: '25px' }}>Coming Soon</Typography>
                    <Typography variant='body2'>Wait for its arrival at your favorite cinema!</Typography>
                </Box>
                <Link 
                href='/coming-soon'
                sx={{color:'links.main',fontWeight:'400', cursor:'pointer',fontSize:24}}>See All</Link>
            </Box>
            <ComingsoonCard/>
        </Container>
    )
}

export default ComingSoon
