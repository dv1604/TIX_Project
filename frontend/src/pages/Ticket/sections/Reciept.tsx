import { Box, Button, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router'

const Detail = ({ label, value }: { label: string, value: string }) => {
    return (<Box
        sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        }}>
        <Typography
            sx={{
                textTransform: 'uppercase'
            }}>
            {label}
        </Typography>
        <Typography>
            {value}
        </Typography>
    </Box>)

}
const Reciept = () => {



    const { ticketPrice, selectedSeats, theatreType } = useSelector((state: RootState) => {
        return state.slots
    })

    const numberOfTickets = Number(selectedSeats?.length);

    const totalPayment = (ticketPrice * numberOfTickets) + (150 * numberOfTickets) - (200);

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                width: {xs:420,sm:638}
            }}
        >
            {/* Heading */}
            <Typography
                variant='h3'>
                Purchase Details
            </Typography>
            {/* Prices */}
            <Detail label='number of tickets' value={String(numberOfTickets)} />
            <Detail label={theatreType} value={`Rs. ${ticketPrice}  X${numberOfTickets}`} />
            <Detail label='service fee' value={`Rs. 150  X${numberOfTickets}`} />
            <Detail label='promo tix id' value='- Rs. 200' />

            <Divider />
            {/* Total amount */}
            <Detail label='total payment' value={`Rs. ${String(totalPayment)}`}/>

            
        </Container>
    )
}

export default Reciept
