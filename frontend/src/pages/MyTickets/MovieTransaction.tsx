import { Box, Container, Typography } from '@mui/material'
import React from 'react';
import movie1 from '../../assests/spiderman.png';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const MovieTransaction: React.FC<{
    movies: {
        title: string,
        img: string,
        day: string,
        venue: string,
        screen: string,
        status: string
    },showStatus?: boolean,
    isLast?: boolean
}> = ({ movies ,showStatus= true,isLast}) => {
    return (
        <Container className='active-ticket' disableGutters maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: {xs:'column',sm:'row'},
                justifyContent: 'space-between',
                gap:{xs:2},
                width: '100%',
                alignItems: {xs:'center',sm:'center'},
                pb: 3,
                borderBottom: isLast ? 'none' : '2px solid rgba(189, 197, 212, 1)'
            }}>
            
            <Box sx={{
                display:'flex',
                flexDirection:{xs:'column',sm:'row'},
                gap:{xs:'24px',sm:'48px'},
                alignItems:'center'
            }}>
            {/* Image Box */}
            <Box
                component='img'
                src={movies.img}
                sx={{
                    width: 135,
                    height:202,
                    objectFit:'cover',
                    borderRadius: '10px'
                }} />

            {/* Movie Detail Box */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems:{xs:'center',sm:'flex-start'},
                gap: {xs:'12px',sm:'24px'},
                minWidth: {sm:'375px'}
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:{xs:'center',sm:'flex-start'},
                    gap: {xs:'8px',sm:'12px'}
                }}>
                    <Typography variant='h3'
                    sx={{
                        textTransform:'capitalize',
                        fontSize:{xs:'19px',sm:'24px'}
                    }}
                    >{movies.title}</Typography>
                    <Typography>{movies.day}</Typography>
                </Box>
                <Typography sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}><LocationOnOutlinedIcon />{movies.venue} <span>({movies.screen})</span></Typography>
            </Box>
            </Box>
            {/* Status Box */}
            {showStatus && (
                <Box sx={{
                    bgcolor: movies.status === 'Sucess' ? 'links.main' : 'rgba(255, 107, 107, 1)',
                    height: 'fit-content',
                    padding: 1.5,
                    minWidth: '100px',
                    textAlign: 'center',
                    textTransform:'capitalize',
                    fontWeight:'bold'
                }}>
                    {movies.status === 'Sucess' ? 'Success' : 'Failed'}
                </Box>
            )}
        </Container>
    )
}

export default MovieTransaction
