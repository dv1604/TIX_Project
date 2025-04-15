import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

const InfoLayout = ({ label, value }: { label: string, value: string }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',
                gap: 0.5
            }}>
            <Typography
                sx={{
                    color: 'grey.400'
                }}>
                {label}
            </Typography>
            <Typography
                sx={{
                    fontSize: '20px',
                    color: 'primary.main'
                }}>
                {value}
            </Typography>
        </Box>
    )
}

const TheatreInfoCard = () => {

    const { movieName, theatreType, theatreName, selectedSeats,selectedTime } = useSelector((state: RootState) => {
        return state.slots
    })

    const today = new Date();
    const formattedDate = today.toLocaleString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

  return (
    <Box
                sx={{
                    bgcolor: 'royalblue.main',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    width:'100%',
                    padding:4,
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                }}>
                <Typography
                    variant='h3'
                    sx={{
                        textTransform: 'capitalize',
                        color: 'rgba(242, 196, 111, 1)',
                    }}>
                    {movieName}
                </Typography>

                {/* theatre and show date and time */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}>

                        <InfoLayout label='Location' value={theatreName} />
                        <Box
                        sx={{
                            display:'flex',
                            gap:5
                        }}>
                            <InfoLayout label='Date' value={formattedDate}/>
                            <InfoLayout label='Time' value={selectedTime}/>
                        </Box>
                    </Box>
                    {/* divider */}
                    <Divider orientation="vertical"  flexItem 
                    sx={{
                        bgcolor:'grey.400'
                    }}/>

                    {/* class and screen */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}>

                        <InfoLayout label='Class' value={theatreType} />

                        <InfoLayout label='Screen' value='Screen 1' />
                       
                    </Box>
                </Box>
            </Box>
  )
}

export default TheatreInfoCard
