import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import ComingsoonCard from '../../components/Cards/ComingsoonCard'

const ComingSoonPage = () => {
    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                padding:'0px 72px 0px 72px',
            }}>
            <Box sx={{ display: 'flex',
                flexDirection:'column', 
                mb:3,
                justifyContent: 'center', 
                width: { xs: '95%', xl: '100%' } }}>

                <Typography variant='h1' 
                sx={{ mb: '25px', 
                    fontSize:'36px',
                    fontWeight:'bold'
                }}>Coming Soon</Typography>
                <Typography variant='body2'>Wait for its arrival at your favorite cinema!</Typography>
            </Box>
                <ComingsoonCard />
        </Container>
    )
}

export default ComingSoonPage
