import { ArrowDropDown, ArrowDropUp, Search } from '@mui/icons-material'
import { Container, FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { movieActions } from '../../../store/features/Movie/MovieSlice'
import FilterDropdown from '../../../components/FilterDropdown'
import { useFilterOptionsMutation } from '../../../store/features/Movie/movieApi'
import { useParams } from 'react-router'

const Filters = () => {

    const {id} = useParams();
    const [ filterOption , {isLoading}] = useFilterOptionsMutation();
    
    const dispatch = useDispatch();
    const { selectedStudio, selectedChain, selectedOffset, selectedCity } = useSelector((state: RootState) => {
        return state.movie
    })

    const [filter , setFilter] = useState<{ screenNames: string[], chains: string[], cities: string[] }>()


    useEffect(() => {

        const fetchFilter = async() => {
            
            const res = await  filterOption({movieId : Number(id), day : selectedOffset , city : selectedCity }).unwrap();
            setFilter(res)
        }

        if(id){
            fetchFilter()
        }

    },[id , filterOption , selectedCity , selectedOffset])

    console.log(filter?.screenNames)
    
    // studio filter handlers
    const studios = ['XXI', '2D', 'CGV', 'GOLD CLASS 2D', 'VELVET 2D', 'CINEPOLIS', 'REGULAR 2D'];
    const handleStudio = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string;
        dispatch(movieActions.setStudio(value ?? selectedStudio));
    }

    // sort filter handlers
    const sort = ['Alphabetically', 'Nearest', 'Cheapest'];
    const [sortOrder,setSortOrder] = useState('Nearest');
    const handleSort = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string;
        setSortOrder(value ?? sortOrder)
    }

    // cinema filter handlers
    const cinema = ['XXI', 'CGV', 'CINEPOLIS'];
    const handleCinema = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string;
        dispatch(movieActions.setChain(value ?? selectedChain));
    }

    // search handle
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(movieActions.setSearchTheatre(event.target.value));
        };


    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: {xs:'column',md:'row'},
                gap:{xs:3,lg:6},
                width:'100%'
            }}>

            {/* Search bar for locations */}
            <TextField
                variant='outlined'
                placeholder='Search Theatres'
                onChange={handleSearch}
                sx={{
                    width: {md:200,lg:400},
                    height: 44,
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'grey',
                            cursor: 'pointer'
                        },
                        '&:hover fieldset': {
                            bgcolor: 'rgba(0,0,0,0.1)',
                            borderColor: 'rgba(0,0,0,0.2)',
                            cursor: 'pointer !important'
                        },
                        '&.Mui-focused fieldset': {
                            bgcolor: 'rgba(0,0,0,0.1)',
                            borderColor: 'rgba(0,0,0,0.2)',
                            cursor: 'pointer'
                        }
                    }
                }}
                inputProps={{
                    'aria-label': 'search'
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Search />
                        </InputAdornment>)
                }}
            />

            {/* Filter Dropdowns */}
            <Container
            disableGutters
            maxWidth={false}
            sx={{
                display:'flex',
                gap:{xs:2,lg:5}

            }}>
                {/* StudioFilter */}
                <FilterDropdown
                    value={selectedStudio ?? ''}
                    onChange={handleStudio}
                    options={filter ? filter?.screenNames : []}
                    placeholder='Studio'
                />
                {/* Sorting Filter */}
                <FilterDropdown
                    value={sortOrder}
                    onChange={handleSort}
                    options={sort}
                    placeholder='Sort'
                />
                {/* Cinema Filter */}
                <FilterDropdown
                    value={selectedChain ?? ''}
                    onChange={handleCinema}
                    options={filter ? filter?.chains : []}
                    placeholder='Cinema'
                />
            </Container>
        </Container>
    )
}

export default Filters
