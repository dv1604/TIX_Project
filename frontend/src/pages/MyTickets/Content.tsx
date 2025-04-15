import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Active from './ActiveTickets/index'
import Transaction from './Transaction List'

const Content = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down(1000));
    return (
        <Container disableGutters maxWidth={false}
            sx={{
                overflow: 'hidden', width: '100%',
                padding: {xs: '0px 0px 10px 10px',sm: '30px 0px 20px 20px',lg: '30px 0px 20px 100px'},
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: {xs:3,sm:5}
            }}>

            {/* Header */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                padding:0,
                margin:0
            }}>
                <Typography variant='h3'>My Tickets</Typography>
                <Typography variant='body2'
                    sx={{ color: 'rgba(90, 99, 122, 1)' }}>List of tickets and transactions you have made</Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '18px'
                }}>
                    <Button sx={{
                        border: '1px solid rgba(51, 61, 88, 1)',
                        borderRadius: '23px',
                        color: 'inherit',
                        textTransform: 'capitalize'
                    }}>Film</Button>
                    <Button sx={{
                        border: '1px solid rgba(51, 61, 88, 1)',
                        borderRadius: '23px',
                        color: 'inherit',
                        textTransform: 'capitalize'
                    }}>Event</Button>
                    <Button sx={{
                        border: '1px solid rgba(51, 61, 88, 1)',
                        borderRadius: '23px',
                        color: 'inherit',
                        textTransform: 'capitalize'
                    }}>Voucher</Button>
                </Box>
            </Box>

            {/* Movies */}
            <Container className='dynamic' disableGutters maxWidth={false} sx={{
                width: {md:'100%',lg:768},
                padding: 0,
                margin: 0,
                maxHeight: 'calc(100vh - 250px)',
                overflowY: 'auto',
                scrollbarWidth: 'none', 
                '&::-webkit-scrollbar': { display: 'none' }
            }}>
                <Routes>

                    <Route index element={<Navigate to="active-ticket" />} />
                    <Route path="active-ticket" element={<Active />} />
                    <Route path="transaction-list" element={<Transaction />} />
                </Routes>
            </Container>
        </Container>
    )
}

export default Content
