import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movies, movies } from './MovieData';
import { MovieResponse } from '../../../types/movieResponse';
interface MoviesState{
    movies : Movies[];
    movieDetails : MovieResponse | null;
    selectedOffset : number;
    selectedMovie:Movies;
    selectedCity:string | null,
    selectedChain:string | null;
    selectedStudio:string | null;
    searchTheatre:string;

}

const initialState:MoviesState = {
    movies,
    movieDetails : null,
    selectedOffset:0,
    selectedMovie: movies.length > 0 ? movies[0] : ({} as Movies), // Set default movie if available
    selectedCity: 'Surat',
    selectedChain:null,
    selectedStudio:null,
    searchTheatre:''
}

const MovieSlice = createSlice({
    name:'movie',
    initialState,
    reducers:{
        setMovieDetails:(state,action :PayloadAction<MovieResponse>) => {
            state.movieDetails = action.payload;
        },
        setOffset :(state,action : PayloadAction<number>) => {
            state.selectedOffset = action.payload
        },
        setMovie:(state,action: PayloadAction<Movies>)=>{
            state.selectedMovie = action.payload;
        },
        setCity:(state,action: PayloadAction<string>)=>{
            state.selectedCity = action.payload;
        },
        setStudio:(state,action: PayloadAction<string>)=>{
            state.selectedStudio= action.payload;
        },
        setChain:(state,action: PayloadAction<string>)=>{
            state.selectedChain= action.payload;
        },
        resetState: (state) => {
            return initialState;
          },
          setSearchTheatre: (state, action: PayloadAction<string>) => {
            state.searchTheatre = action.payload;
        }
    }
})

export const movieActions = MovieSlice.actions;
export default MovieSlice.reducer;
