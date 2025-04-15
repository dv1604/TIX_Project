import React from 'react'
import Heading from './sections/Heading'
import { Box, Container, Typography } from '@mui/material'
import Selection from './sections/Selection'
import SeatGrid from './sections/SeatGrid'
import SeatInfo from './sections/SeatInfo'

const SeatBooking = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          padding: {xs:'0px 20px',md:"0px 72px"},
          overflow: "hidden",
        }}
      >
        <Heading />
        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: {xs:'flex-start',md:"center"},  // Ensures everything is centered
            padding: {xs:'20px 10px',xl:"40px 130px"},   
            width: "100%",  
            margin: "auto",
          }}
        >
          <Selection />
          <SeatGrid />
        </Container>
      </Container>
      <Box
        sx={{
          bgcolor: 'links.main',
          mt: 5,
          height: 50,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'grey.200',
            textAlign: 'center',
            padding: 0,
            margin: 0
          }}>
          Cinema Screen Here
        </Typography>
      </Box>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          mt:8,
          padding: {xs:'0px 80px',md:'0px 190px'},
        }}>
          <SeatInfo/>
      </Container>
    </Container>

  )
}

export default SeatBooking
