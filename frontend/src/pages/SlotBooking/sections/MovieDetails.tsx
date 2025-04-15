import { Box, Container, Typography,Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

const MovieDetails = () => {

    const movie = useSelector((state:RootState)=>{
        return state.movie.selectedMovie
    })

    const {movieDetails} = useSelector((state: RootState) => {
        return state.movie
    })

  return (
    <Container
    disableGutters
    maxWidth={false}
    sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:{xs:'center',lg:'flex-start'},
        justifyContent:{xs:'space-between',lg:'flex-start'},
        flexWrap:'wrap',
        gap:4,
        mt:10,
        width:'100%'
    }}>
        <Box
        component='img'
        src={movieDetails?.image}
        sx={{
            width:{xs:410,md:320,lg:410},
            height:{xs:250,md:300,lg:364},
            borderRadius:'10px',
            objectFit:'cover'
        }}/>
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            gap:2,
            width : '100%',
            alignItems:{xs:'center',lg:'flex-start'},
        }}>
            <Typography
            variant='h3'
            sx={{
                letterSpacing:'0.8px'
            }}>
                {movieDetails?.title}
            </Typography>
            <Grid container 
            spacing={2} 
            sx={{
                color:'grey.900',
                width:"50%"
            }}>
                <Grid item xs={6} 
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: 1.5 }}>
                    <Typography>
                        Genre
                    </Typography>
                    <Typography>
                        Duration
                    </Typography>
                    <Typography>
                        Director
                    </Typography>
                    <Typography>
                        Age Rating
                    </Typography>
                </Grid>
                <Grid item xs={6} 
                sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                    gap: 1.5 }}>
                <Typography>
                        {movieDetails?.genre}
                    </Typography>
                    <Typography>
                        {movieDetails?.duration}
                    </Typography>
                    <Typography>
                        {movieDetails?.director}
                    </Typography>
                    <Typography>
                        {movieDetails?.rating}
                    </Typography>
                </Grid>
            </Grid>

            </Box>
    </Container>
  )
}

export default MovieDetails
