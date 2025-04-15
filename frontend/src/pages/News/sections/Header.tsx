import { ArrowDropDown, ExpandMore, Search } from '@mui/icons-material'
import { Box, Container, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, selectKeywords } from '../../../store/features/News/newsLogic';
import OvalButton from '../../../components/Buttons/OvalButton';
import { setCategory, setKeyword, setSearchQuery } from '../../../store/features/News/newsSlice';

const Header = () => {
    const selectedCategory = useSelector(selectCategory);
    const dispatch = useDispatch();
    const keywords = useSelector(selectKeywords);

    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as "Spotlight" | "News" | "Video"; // Type assertion
        dispatch(setCategory(value));
        setIsFirstLoad(false)
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(event.target.value));
    };

    return (
        <Container disableGutters
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: '30px'

            }}>
            <Typography variant='h2'>TIX ID News</Typography>
            <Typography variant='body1'>
                The latest news about the world of cinema for you!
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 6
                }}>
                <TextField
                    variant='outlined'
                    placeholder='Search Post'
                    onChange={handleSearch}
                    sx={{
                        width: { xs: 400, sm: 576 },
                        height: 48,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'grey',
                            },
                            '&:hover fieldset': {
                                borderColor: 'black'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black !important'
                            }
                        }
                    }}
                    inputProps={{
                        "aria-label": 'search'
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Search />
                            </InputAdornment>
                        )
                    }}></TextField>

                <FormControl sx={{ width: 200 }}>
                    <Select
                        value={selectedCategory}
                        onChange={handleChange}
                        displayEmpty
                        renderValue={(selected) => isFirstLoad ? "Sort" : selected}
                        IconComponent={ArrowDropDown}
                        sx={{
                            boxShadow: "none",
                            width: 150,
                            height: 34,
                            backgroundColor: "white",
                            borderRadius: 2,
                            ".MuiOutlinedInput-notchedOutline": { border: "none" },
                            "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                        }}
                        MenuProps={{
                            anchorOrigin: { vertical: "bottom", horizontal: "left" },
                            transformOrigin: { vertical: "top", horizontal: "left" },
                            PaperProps: { sx: { mt: 1 } },
                        }}
                    >
                        <MenuItem value="Spotlight">Spotlight</MenuItem>
                        <MenuItem value="News">News</MenuItem>
                        <MenuItem value="Video">Video</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                display: 'flex',
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                gap: 2
            }}>
                {/* all available keywords */}
                {keywords.map((keyword, index) => (
                    <OvalButton
                        key={index}
                        onClick={(() => dispatch(setKeyword(keyword)))}
                    >
                        {keyword}
                    </OvalButton>
                ))}
            </Box>
        </Container>
    )
}

export default Header
