import { Container, Typography } from '@mui/material'
import React from 'react'

const Heading = () => {
  return (
    <Container
    disableGutters
    maxWidth={false}
    sx={{
        display: 'flex',
        flexDirection: 'column',
        gap:1.3,
        width:'100%',
    }}>
        <Typography
        variant='h2'
        sx={{
            textTransform:'uppercase'
        }}>
            Choose Seat
        </Typography>
        <Typography
        sx={{
            color:'grey.600'
        }}>
            Select the seat you will occupy during the movie screening.
        </Typography>
    </Container>
  )
}

export default Heading
