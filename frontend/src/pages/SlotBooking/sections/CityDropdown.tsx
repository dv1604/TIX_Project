import { Container, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { KeyboardArrowDown, KeyboardArrowUp, LocationOnOutlined } from '@mui/icons-material'
import { movieActions } from '../../../store/features/Movie/MovieSlice'

const CityDropdown = () => {
  const { selectedMovie, selectedCity } = useSelector((state: RootState) => state.movie);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handlechange = (event : SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    dispatch(movieActions.setCity(value ?? selectedCity));
    dispatch(movieActions.resetFilters())
    setOpen(false)
  }

  return (
    <Container disableGutters maxWidth={false}>
      {/* Select city Dropdown */}
      <FormControl>
        <Select
          value={selectedCity ?? ''}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={handlechange}
          displayEmpty
          renderValue={(selected) => (
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 20, textTransform: 'uppercase' ,
              mr:5
            }}>
              <LocationOnOutlined sx={{ fontSize: '32px' }} />
              {selected}
            </Typography>
          )}
          IconComponent={(props) =>
            open ? (
              <KeyboardArrowUp {...props} sx={{ fontSize: 32 }} /> // Larger Up Arrow
            ) : (
              <KeyboardArrowDown {...props} sx={{ fontSize: 32 }} /> // Larger Down Arrow
            )
          }
          sx={{
            fontSize: 20,
            width: 'auto',
            padding:0,
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            '.MuiSelect-select':{padding:'0 !important'}
          }}
          MenuProps={{
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            PaperProps: {
              sx: {
                padding: 2,
                boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
                border: '1px solid',
                borderColor: 'grey.400'
              }
            }
          }}
        >
          {/* Dropdown Heading */}
          <MenuItem
            onClick={() => setOpen(false)}
            sx={{
              fontSize: 20,
              fontWeight: 'bold',
              background: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 1
            }}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: 20, width: 150, textTransform: 'uppercase' }}>
              {selectedCity}
              <KeyboardArrowUp sx={{ fontSize: '32px' }} />
            </Typography>
          </MenuItem>

            {/* Dropdown Options */}
          {selectedMovie.city.map((city, index) => (
            <MenuItem
              key={index}
              value={city.name}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'grey.400',
                padding: 1,
                marginLeft: 1,
                marginRight: 1,
                textTransform: 'uppercase'
              }}
            >
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default CityDropdown;
