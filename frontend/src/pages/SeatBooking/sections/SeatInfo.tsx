import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useNavigate } from 'react-router'
import { selectSeat } from '../../../store/features/Booking/bookingSlice'

const SeatInfo = () => {

    const {selectedSeats,totalAmount,movieId} = useSelector((state:RootState)=>{
        return state.slots
    });
    const {isAuthenticated} = useSelector((state:RootState)=>{
        return state.auth
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!isAuthenticated) {
            navigate("/login"); 
        } else {
            dispatch(selectSeat());
            navigate("/payment"); 
        }
    }
    

    return (
        <Container
        disableGutters
        maxWidth={false}
        sx={{
            display: 'flex',
            flexDirection: {xs:'column',md:'row'},
            justifyContent: {md:'space-between'},
            width: '100%',
            gap:5,
            alignItems: 'center',
        }}>
            {/* Total Amount */}
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}>
                <Typography
                variant='h4' 
                sx={{
                    fontSize: '18px',
                    fontWeight:500,
                    color:'grey.600'
                }}>
                    Total
                </Typography>
                <Typography
                variant='h2'>
                    Rs. {totalAmount}
                </Typography>
            </Box>
            {/* Selected Seat Display */}
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
            }}>
                <Typography
                variant='h4' 
                sx={{
                    fontSize: '18px',
                    fontWeight:500,
                    color:'grey.600'
                }}>
                    Seat
                </Typography>
                <Typography
                variant='h2'>
                    {selectedSeats?.join(', ')}
                </Typography>
            </Box>
            <Box
            sx={{
                display: 'flex',
                gap:'24px'
            }}>
                <Button
                variant='outlined'
                onClick={()=> navigate(`/slots/${movieId}`)}
                sx={{
                    height:48,
                    width:199,
                    fontSize:'20px',
                    border:'1px solid',
                    borderColor:'grey.600',
                    borderRadius:'5px',
                    color:'grey.600'
                }}>
                    Back
                </Button>
                <Button
                variant='contained'
                onClick={handleSubmit}
                sx={{
                    height:48,
                    width:199,
                    fontSize:'20px',
                    borderRadius:'5px',
                    color:'rgba(255, 190, 0, 1)',
                    bgcolor:'royalblue.main'
                }}>
                    Submit
                </Button>
            </Box>
        </Container>
    )
}

export default SeatInfo
