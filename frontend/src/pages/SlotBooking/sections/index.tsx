import React from 'react'
import DateSelection from './DateSelection'
import { Container, Grid, Typography } from '@mui/material'
import MovieDetails from './MovieDetails'
import CityDropdown from './CityDropdown'
import Filters from './Filters'
import AvailableSlots from './AvailableSlots'
import SelectedShow from './SelectedShow'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

const Slots = () => {

    const {movieDetails} = useSelector((state:RootState)=>{
        return state.movie
    })

    console.log(movieDetails);


    return (
        <Container
            disableGutters
            maxWidth={false}>
            <Grid container
                columnSpacing={16}>
                <Grid item xs={12} md={7}
                    sx={{
                    }}>
                    <Container
                        disableGutters
                        maxWidth={false}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 6,
                        }}>

                        <DateSelection />
                        <Container 
                        disableGutters
                        maxWidth={false}
                        sx={{
                            display:'flex',
                            flexDirection:'column',
                            gap:'32px'
                        }}>
                            <CityDropdown />
                            <Filters />
                            <AvailableSlots/>
                        </Container>
                    </Container>
                </Grid>
                <Grid item xs={12} md={5}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:'center',
                        gap: 6,
                        width:415
                    }}>
                    <MovieDetails />
                    <SelectedShow/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Slots
