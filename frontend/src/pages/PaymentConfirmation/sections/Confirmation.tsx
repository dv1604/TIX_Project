import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import ASSESTS from '../../../assests'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { completePayment } from '../../../store/features/Booking/bookingSlice'

const Confirmation = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(completePayment())
        navigate('/ticket')
    }

  return (
    <Container
    disableGutters
    maxWidth={false}
    sx={{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:4
    }}>
        <Typography
        variant='h1'
        sx={{
            fontSize:{xs:'40px',sm:'45px',lg:'56px'}
        }}>
            Payment Successful!
        </Typography>
        <Box
        sx={{
            width:'fit-content',
            alignSelf:'center',
            pl:'100px'
        }}>
            <Box
            component='img'
            src={ASSESTS.images.clapperBoard}/>
            <Box
            component='img'
            src={ASSESTS.images.movieRoll}
            sx={{
                transform:'translate(-40%,40%)'
            }}/>
        </Box>
        <Typography
        sx={{
            fontSize:'20px',
            color:'grey.600',
            width:{xs:'80%',lg:'45%'},
            mt:'40px'
        }}>
        Transaction details have been sent to your email. You can also check other ticket details in "My Tickets" on both the website and your smartphone.
        </Typography>
        <Button
        variant='outlined'
        sx={{
            border:'1px solid',
            borderColor:'grey.600',
            color:'grey.400',
            padding:{xs:'5px 8px',lg:'5px 16px'},
            margin:0,
            fontSize:{xs:'20px',lg:'24px !important'},
            textTransform:'capitalize'
        }}
        onClick={handleSubmit}>
            My Ticket
        </Button>
    </Container>
  )
}

export default Confirmation
