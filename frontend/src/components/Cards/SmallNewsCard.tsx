import { Box, Typography } from '@mui/material'
import React from 'react'

const SmallNewsCard : React.FC<{
  news : {
    image:string,
    category:string,
    title:string
  }
}> = ({news}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', lg: 'column' },
        alignItems: { xs: 'center', lg: 'flex-start' },
        justifyContent: 'center',
        gap: { xs: 2, xl: 4 },
        width: { xs: '95%', lg: 368, xl: 419 },
        minHeight: { lg: 450 },
        border: { xs: '1px solid grey', lg: '1px solid transparent' },
        borderRadius: { xs: '10px', lg: '' },
        padding: { xs: 2, lg: 0 },
        mx: { xs: 1, lg: 0 }
      }}>

        {/* News Image */}
      <Box
        component='img'
        src={news.image}
        sx={{ width: { xs: 200, sm: 300, lg: 360, xl: 419 }, objectFit: 'cover', 
        aspectRatio: "16/9",
        height: { lg: 237 }, borderRadius: '10px', alignSelf: { xs: 'center', lg: 'flex-start' } }}
      />

      {/* News Detail Box */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px', width: { xs: '100%', lg: 355 },
    minHeight:'163px' }}>

        {/* News Category */}
        <Typography variant='subtitle2'
          sx={{
            textTransform: 'capitalize',
            border: '1px solid rgba(51, 61, 88, 1)',
            borderRadius: { xs: '10%', lg: '0' },
            color: 'rgba(51, 51, 51, 1)',
            width: 'fit-content',
            padding: { xs: '0px 10px', sm: 1 },
            bgcolor: { xs: 'rgba(0,0,0,0.1)', lg: 'inherit' },
            fontSize: { xs: 13, sm: 16 }
          }}>{news.category}</Typography>

          {/* News Title */}
        <Typography sx={{ color: 'rgba(51, 51, 51, 1)', fontSize: { xs: 16, sm: 20, lg: '20' } }} variant='h3'>{news.title}</Typography>

        {/* News Date */}
        <Typography variant='body2' sx={{ color: 'rgba(51, 51, 51, 1)' }}>17 Nov 2021 | TIX ID</Typography>
      </Box>
    </Box>
  )
}

export default SmallNewsCard
