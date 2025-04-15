import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import DetailsCard from './sections/DetailsCard'
import TransactionCard from './sections/TransactionCard'
import { useNavigate } from 'react-router'
import { ArrowBack } from '@mui/icons-material'

const Payment = () => {

  const navigate = useNavigate();

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        padding: {xs:'0px 20px',lg:'0px 72px'},
        mt: 5,
        display: "flex",
        flexDirection: 'column',
        alignItems: {xs:'center',lg:'flex-start'},
        gap: 7,
      }}>
        {/* Heading */}
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          padding:0,
          margin:0
        }}>
        <Typography
          variant='h2'
          sx={{
            fontSize: {sm:'30px',lg:'36px'},
            textTransform: 'uppercase'
          }}>
          Payment Confirmation
        </Typography>
        <Typography
          sx={{
            color: 'grey.600'
          }}>
          Payment confirmation for the seats you have booked
        </Typography>
      </Container>
      {/* Cards Section */}
      <Container
      disableGutters
      maxWidth={false}
      sx={{
        display:'flex',
        flexDirection:{xs:'column',lg:'row'},
        justifyContent:'flex-start',
        alignItems:{xs:'center',lg:''},
        padding:0,
        margin:0,
        width:'fit-content',
        gap:'80px'
      }}>
        <DetailsCard />
        <TransactionCard/>
      </Container>
      <Button
                variant="outlined"
                onClick={()=> navigate('/seat')}
                startIcon={<ArrowBack />}
                sx={{
                    color: 'grey.700',
                    textTransform: 'capitalize',
                    width: '100%',
                    fontSize: '24px',
                    display:'flex',
                    justifyContent:'flex-start'
                }}
            >
                Back
            </Button>
    </Container>
  )
}

export default Payment
