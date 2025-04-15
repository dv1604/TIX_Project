import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import ASSESTS from '../../assests';

const Advertisement = () => {
    const advertisements = [ASSESTS.images.ad1,ASSESTS.images.ad2, ASSESTS.images.ad3];

    return (
        <Box sx={{ position: 'relative', width: '100%', height: { xs: 120, sm: 180, md: 220, lg: 304 } , overflow: {xs:'hidden',xl:'visible'} }}> 
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                speed={300}
                loop={true}
                pagination={{ clickable: true, el: '.swiper-pagination' }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                navigation={{ prevEl: '.ad-prev', nextEl: '.ad-next' }}
                style={{ width: '100%', height: '100%' }}
            >
                {advertisements.map((ad, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            component='img'
                            src={ad}
                            sx={{ width: {xs:'100%',lg:'100%'}, height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Previous Button */}
            <IconButton
                className='ad-prev'
                sx={{
                    position: 'absolute',
                    width: { xs: 35,lg:50, xl: 72 },
                    height: { xs: 35, lg:50,xl: 72 },
                    top: '50%',
                    left: { xs: 5, lg:20,xl: 0 }, 
                    transform: 'translate(-50%,-50%)',
                    zIndex: 20, 
                    bgcolor: 'primary.main',
                    color: 'inherit',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
                    '&:hover': { bgcolor: 'primary.dark' }
                }}
            >
                <ArrowBackIosNew sx={{ fontSize: { xs: 12, lg: 28 } }} />
            </IconButton>

            {/* Next Button */}
            <IconButton
                className='ad-next'
                sx={{
                    position: 'absolute',
                    width: { xs: 35,lg:50, xl: 72 },
                    height: { xs: 35, lg:50,xl: 72 },
                    top: '50%',
                    right: { xs: 5,lg:20, xl: 0 }, 
                    transform: 'translate(50%,-50%)',
                    zIndex: 20, 
                    bgcolor: 'primary.main',
                    color: 'inherit',
                    border: '1px solid rgba(0,0,0,0.1)',
                    boxShadow: '2px 2px 12px rgba(0,0,0,0.2)',
                    '&:hover': { bgcolor: 'primary.dark' }
                }}
            >
                <ArrowForwardIos sx={{ fontSize: { xs: 12, lg: 28 } }} />
            </IconButton>

            {/* Pagination */}
            <Box
                className="swiper-pagination"
                sx={{
                    position: 'absolute',
                    bottom: 10,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    '& .swiper-pagination-bullet': {
                        backgroundColor: 'rgba(0,0,0, 0.8)',
                        width: { xs: 8, lg: 12 },
                        height: { xs: 8, lg: 12 },
                        opacity: 0.5,
                        transition: 'opacity 0.3s'
                    },
                    '& .swiper-pagination-bullet-active': {
                        backgroundColor: 'rgba(116, 98, 98, 1)',
                        opacity: 1
                    }
                }}
            />
        </Box>
    );
};

export default Advertisement;
