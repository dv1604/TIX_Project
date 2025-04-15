import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import React, { useState } from 'react'

const FilterDropdown: React.FC<{
    value: string;
    onChange: (event: SelectChangeEvent<string>) => void;
    options: string[];
    placeholder: string



}> = ({ value, onChange, options, placeholder }) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event);
        setIsFirstLoad(false)

    }

    return (
        <FormControl>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
                renderValue={(selected) => (isFirstLoad ? placeholder : selected)}
                IconComponent={ArrowDropDown}
                sx={{
                    ".MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },
                    textShadow:'1px 1px 8px rgba(0,0,0,0.3)'
                }}
                MenuProps={{
                    anchorOrigin: { vertical: 'top', horizontal: 'center' },
                    PaperProps: {
                        sx: {
                            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                            width: '200px',

                        }
                    }
                }}
            >
                <MenuItem>
                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                        {placeholder}
                        <ArrowDropUp />
                    </Typography>
                </MenuItem>
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option}
                        sx={{
                            padding: 1.5
                        }} >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default FilterDropdown
