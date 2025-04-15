import { Container, FormControl, Select, Typography, MenuItem, Grid } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { AccessTime, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

const Selection = () => {
    const [open, setOpen] = useState(false);

    const { selectedTime, slots } = useSelector((state: RootState) => state.slots);

    // Function to chunk the slots into rows of 4
    const chunkSlots = (slots: string[], size: number) => {
        const result = [];
        for (let i = 0; i < slots.length; i += size) {
            result.push(slots.slice(i, i + size));
        }
        return result;
    };

    const chunkedSlots = chunkSlots(slots, 4);

    const seatStatus = [
        {
            status: 'Sold',
            color: 'royalblue.main',
        },
        {
            status: 'Available',
            color: 'primary.main',
        },
        {
            status: 'Selected',
            color: 'links.main',
        },]

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <FormControl>
                <Select
                    displayEmpty
                    value={selectedTime}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                    renderValue={(selected) => (
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: {xs:18,md:20},
                                textTransform: 'uppercase',
                                mr: 5,
                                color: 'inherit',
                            }}
                        >
                            <AccessTime sx={{xs:'20px',md:'32px'}} />
                            {selectedTime}
                        </Typography>
                    )}
                    IconComponent={(props) =>
                        open ? (
                            <KeyboardArrowUp {...props} sx={{xs:'20px',md:'32px'}} />
                        ) : (
                            <KeyboardArrowDown {...props} sx={{xs:'20px',md:'32px'}} />
                        )
                    }
                    sx={{
                        fontSize: 20,
                        width: 'auto',
                        padding: 0,
                        ".MuiOutlinedInput-notchedOutline": { border: "none" },
                        '.MuiSelect-select': { padding: '0 !important' }
                    }}
                    MenuProps={{
                        anchorOrigin: { vertical: 'top', horizontal: 'center' },
                        PaperProps: {
                            sx: {
                                padding: 2,
                                boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
                                border: '1px solid',
                                borderColor: 'grey.400',
                                width: '400px',
                                borderRadius: '12px',
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
                            padding: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                fontSize: {xs:18,md:20},
                                textTransform: 'uppercase',
                                mr: 5,
                                color: 'inherit',
                            }}
                        >
                            <AccessTime sx={{ fontSize: {xs:'20px',md:'32px'} }} />
                            {selectedTime}
                            <KeyboardArrowUp sx={{ fontSize: {xs:'20px',md:'32px'} }} />
                        </Typography>
                    </MenuItem>

                    {/* Render Slots in rows of 4 */}
                    {chunkedSlots.map((row, rowIndex) => (
                        <Grid container spacing={1} key={rowIndex} sx={{ padding: '8px' }}>
                            {row.map((slot, index) => (
                                <Grid item xs={3} key={index}>
                                    <MenuItem
                                        sx={{
                                            borderRadius: '4px',
                                            fontSize:{xs:'14px',md:''},
                                            border: '1px solid',
                                            borderColor: 'grey.400',
                                            textAlign: 'center',
                                            width: '90%',
                                            display: 'block',
                                            '&:hover': {
                                                bgcolor: 'royalblue.main',
                                                color: 'white'
                                            }
                                        }}
                                        value={slot}
                                    >
                                        {slot}
                                    </MenuItem>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Select>
            </FormControl>
            {/* Selection Colors */}
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3.5,
                    alignItems: 'center',
                    width: 'fit-content',
                    margin: 0
                }}>

                {seatStatus.map((seat, index) => (
                    <Container
                        disableGutters
                        maxWidth={false}
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '12px',
                            alignItems: 'center',
                        }}
                    >
                        <Container
                            disableGutters
                            maxWidth={false}
                            sx={{
                                width: {xs:'13px',md:'20px'},
                                height: {xs:'13px',md:'20px'},
                                bgcolor: seat.color,
                                border: '1px solid',
                                borderColor: 'grey.400'
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: {xs:13,md:20},
                                color: 'inherit',
                            }}
                        >
                            {seat.status}
                        </Typography>
                    </Container>
                ))}
            </Container>
        </Container>
    );
};

export default Selection;
