import React, { useEffect } from 'react'
import Slots from './sections'
import { Container } from '@mui/material'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { movieActions } from '../../store/features/Movie/MovieSlice'
import { slotsActions } from '../../store/features/Slots/SlotsSlice'
import { useMovieDetailMutation } from '../../store/features/Movie/movieApi'

const SlotBooking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [getMovieDetails] = useMovieDetailMutation();

  const {selectedOffset ,selectedCity ,selectedChain , selectedStudio} = useSelector((state: RootState) => {
    return state.movie
  })


  const selectedMovie = useSelector((state: RootState) =>
    state.movie.movies.find((movie) => movie.id === Number(id))
  );

  console.log(selectedChain,selectedStudio)

  useEffect(() => {
    
  
    const fetchMovies = async ( ) => {
      const movieDetails = await getMovieDetails({movieId : Number(id),city :selectedCity ?? 'Surat',dayOffset : selectedOffset , chain : selectedChain , screenName : selectedStudio}).unwrap();
      dispatch(movieActions.setMovieDetails(movieDetails));
      console.log(movieDetails);

    }
    try{
      if(id){
        fetchMovies();
        console.log()
      }
    }catch(err){
      console.log(err);
    }
  },[id,getMovieDetails,dispatch,selectedOffset, selectedCity , selectedChain,selectedStudio]);

  

  useEffect(() => {
    if (selectedMovie) {
      dispatch(movieActions.setMovie(selectedMovie));
    }
  }, [dispatch, selectedMovie]);



  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ padding: '0px 72px 0px 72px' }}
    >
      <Slots />
    </Container>
  );
};

export default SlotBooking;
