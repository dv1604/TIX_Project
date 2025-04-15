import { Box, Container } from '@mui/material'
import React, { useEffect } from 'react'
import MovieCarousel from './MovieCarousel'
import Advertisement from './Advertisement'
import NewsSection from './NewsSection'
import ComingSoon from './ComingSoon'
import { useDispatch } from 'react-redux'
import { slotsActions } from '../../store/features/Slots/SlotsSlice'
import { movieActions } from '../../store/features/Movie/MovieSlice'

const Homepage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Reset slot and movie when navigating to homepage
    dispatch(slotsActions.resetSlot());
    dispatch(movieActions.resetState());
  }, [dispatch]);

  return (
    <Container className='homepage' maxWidth={false} sx={{maxWidth:1300,display:'flex',flexDirection:'column',gap: { xs: '40px', sm: '80px', md: '116px '},alignItems:'center'}} disableGutters>
      <MovieCarousel/>
      <Advertisement/>
      <NewsSection/>
      <ComingSoon/>
    </Container>
  )
}
export default Homepage

