import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { useNavigate } from 'react-router'
import { useCreateCheckoutSessionMutation } from '../../../store/features/Payment/paymentApi'

const TransactionCard = () => {

    const {selectedSeats,ticketPrice,theatreType} = useSelector((state:RootState) => {
        return state.slots
    })

    const {userId,movieId,dayOffset,theatreId,screenId,slotId,seatIds,totalAmount} = useSelector((state : RootState) => {
        return state.payment
    })

    const [ createCheckoutSession , {isLoading}]  = useCreateCheckoutSessionMutation();

    const numberOfTickets = Number(selectedSeats?.length);

    const totalPayment = (ticketPrice * numberOfTickets) + (150 * numberOfTickets) - (200);

    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleBuyNow = async() => {

        try{

            const stripeUrl = await createCheckoutSession({
                userId,
                movieId,
                theatreId,
                screenId,
                slotId,
                seatIds,
                dayOffset,
                totalAmount
            }).unwrap() as {url: string};

            window.location.replace(stripeUrl.url as string);

        }catch(err){
            console.log("STRIPE ERROR : ", err)
        }


    }
  return (
    <Container
    disableGutters
    maxWidth={false}
    sx={{
        width:{xs:'400px',sm:'650px'},
        padding:4,
        display:'flex',
        flexDirection:'column',
        boxShadow:'2px 2px 8px 2px rgba(0,0,0,0.1)',
        borderRadius:'10px',
        gap:3,
    }}>
        <Typography
        sx={{
            fontSize:'24px',
            fontWeight:500
        }}>
            Order Summary
        </Typography>

        {/* Transaction details */}
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            gap:1,
            borderBottom:'1px solid',
            borderColor:'grey.300',
            pb:2
        }}>
            <Typography
            sx={{
                fontWeight:700
            }}>
                Transaction Details
            </Typography>
            <Box
            sx={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%',
                alignItems:'center'
            }}>
                <Typography
                sx={{
                    textTransform:'uppercase'
                }}>
                    {theatreType}
                </Typography>
                <Typography>
                    Rs. {ticketPrice} X{selectedSeats?.length}
                </Typography>
            </Box>
            <Box
            sx={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%',
                alignItems:'center'
            }}>
                <Typography
                sx={{
                    textTransform:'uppercase'
                }}>
                    Service Fee
                </Typography>
                <Typography>
                    Rs. 150 X{selectedSeats?.length}
                </Typography>
            </Box>
        </Box>

        {/* promo and voucher */}
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            gap:1,
            borderBottom:'1px solid',
            borderColor:'grey.300',
            pb:2
        }}>
            <Typography
            sx={{
                fontWeight:700
            }}>
               Promo & Voucher
            </Typography>
            <Box
            sx={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%',
                alignItems:'center'
            }}>
                <Typography 
                sx={{
                    textTransform:'uppercase'
                }}>
                    Promo tix id
                </Typography>
                <Typography>
                   - Rs. 200 
                </Typography>
            </Box>
        </Box>
        <Box
            sx={{
                display:'flex',
                justifyContent:'space-between',
                width:'100%',
                alignItems:'center',
                color:'grey.900'
            }}>
                <Typography 
                sx={{
                    textTransform:'capitalize',
                    color:'inherit',
                    fontWeight:700
                }}>
                    total payment
                </Typography>
                <Typography
                sx={{
                    color:'inherit',
                    fontWeight:700
                }}>
                    Rs. {totalPayment}
                </Typography>
            </Box>
            <Typography
            sx={{
                fontSize:'12px',
                color:'rgba(255, 107, 107, 1)'
            }}>
            *Ticket purchases cannot be canceled
            </Typography>
            <Button
            variant='contained'
            sx={{
                bgcolor:'royalblue.main',
                color:'rgba(255, 190, 0, 1)',
                padding:'9px 12px'
            }}
            onClick={handleBuyNow}
            >
                buy now
            </Button>
    </Container>
  )
}

export default TransactionCard
