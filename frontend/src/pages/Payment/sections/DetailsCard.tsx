import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { ArrowBack } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router';

const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            mt:2,
            pb: 2,
            borderBottom: '1px solid',
            borderColor: 'grey.200',
        }}
    >
        <Typography sx={{ textTransform: 'capitalize', color: 'grey.700' }}>
            {label}
        </Typography>
        <Typography sx={{ fontSize: '24px', fontWeight: 500, textTransform: 'uppercase' }}>
            {value}
        </Typography>
    </Box>
);

const DetailsCard = () => {
    const { movieName, theatreType, selectedTime, selectedSeats ,} = useSelector(
        (state: RootState) => state.slots
    );

   

    const today = new Date();
    const formattedDate = today.toLocaleString('en-IN', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{ display: 'flex', flexDirection: 'column', width: {xs:'100%',lg:'60%' }}}
        >
            <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
                Schedule Details
            </Typography>

            <DetailRow label="Movie Title" value={movieName} />
            <DetailRow label="Date" value={formattedDate} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'grey.200',
                }}
            >
                <DetailRow label="Class" value={theatreType} />
                <DetailRow label="Time" value={selectedTime} />
            </Box>

            <DetailRow label={`Tickets (${selectedSeats?.length})`} value={selectedSeats?.join(', ') ?? ''} />

            
        </Container>
    );
};

export default DetailsCard;
