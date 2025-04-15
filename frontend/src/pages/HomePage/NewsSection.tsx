import { Box, colors, Container, Link, Typography, useTheme } from '@mui/material'
import React from 'react'
import ASSESTS from '../../assests';
import RecommendNews from '../../components/RecommendNews';

const NewsSection = () => {

    const theme = useTheme();

    return (
        <Container disableGutters maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: { xs: '95%', xl: '100%' } }}>
                <Box>
                    <Typography variant='h3' sx={{ mb: '25px' }}>TIX ID News</Typography>
                    <Typography variant='body2'>Latest news about the film industry for you!</Typography>
                </Box>
                <Link
                 href='/news'
                sx={{ color: 'links.main', fontWeight: '400', cursor: 'pointer', fontSize: 24 }}>See All</Link>
            </Box>
            <RecommendNews/>
        </Container>
    )
}

export default NewsSection
