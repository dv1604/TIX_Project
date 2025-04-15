import React from 'react';
import { Box, Button, Container, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import ASSESTS from '../../assests';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import { useGetAllMovieQuery } from '../../store/features/Movie/movieApi';

const MovieCarousel = () => {

    const {data,isLoading} = useGetAllMovieQuery();
    console.log(data)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    
    
    const navigate = useNavigate();
    
    return (
        <Container className='carousel' maxWidth={false} sx={{ height: { xs: 550, md: 650, lg: 800}, width: '100%', mt: { xs: 5, md: 10 }, position: 'relative' }}>
            <Swiper
                modules={[Navigation]}
                slidesPerView={isMobile ? 1 : isTablet ? 2 : 2}
                spaceBetween={isMobile ? 10 : isTablet ? 20 : 30}
                loop={true} 
                navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
                style={{ width: '90%' }}>
                {data?.map((movie, index) => (
                    <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                            <Box
                                component='img'
                                src={movie.image}
                                onClick={()=> navigate(`/slots/${movie.id}`)}
                                sx={{
                                    width: { xs: '100%', lg: 495 },
                                    height: { xs: 400,md:600,lg: 707 },
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    transition: 'transform 0.5s ease',
                                    cursor:'pointer',
                                }}
                            />
                            <Container disableGutters sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '15px', md: '24px' }, alignItems: 'center' }}>
                                <Typography variant='h2' sx={{ fontSize: { xs: 23, md: 28, lg: 36 } }}>{movie.title}</Typography>
                                <Container sx={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', height: 26 }} disableGutters>
                                    <Button sx={{ background: (theme) => theme.customGradients.primary, fontSize: 12 }}>XXI</Button>
                                    <Button sx={{ bgcolor: 'cgv.main', fontSize: 12 }}>CGV</Button>
                                    <Button sx={{ bgcolor: 'cinepolis.main', fontSize: 12 }}>Cinépolis</Button>
                                </Container>
                            </Container>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
            <IconButton
                className='custom-prev'
                sx={{
                    position: 'absolute',
                    width: { xs: 55, md: 72 },
                    height: { xs: 55, md: 72 },
                    top: '50%',
                    left: 10,
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    bgcolor: 'primary.main',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                }}
            >
                <ArrowBackIosNew sx={{ fontSize: 28, margin: 'auto' }} />
            </IconButton>
            <IconButton
                className='custom-next'
                sx={{
                    position: 'absolute',
                    width: { xs: 55, md: 72 },
                    height: { xs: 55, md: 72 },
                    top: '50%',
                    right: 10,
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    bgcolor: 'primary.main',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }
                }}
            >
                <ArrowForwardIos sx={{ fontSize: 28, margin: 'auto' }} />
            </IconButton>
        </Container>
    )
}

export default MovieCarousel;
