import React from 'react'
import ASSESTS from '../../assests'
import { Box, Button, Container, Typography, useTheme } from '@mui/material'

const ComingsoonCard = () => {

    const theme = useTheme()
    const movies = [{
            img:ASSESTS.images.matrix,
            title:'The Matrix: Resurrections'
        },
        {
            img:ASSESTS.images.resident_evil,
            title:'Resident Evil: Welcome to Raccoon City'
        },
        {
            img:ASSESTS.images.sword,
            title:'Sword Art Online: Progressive - Aria of a Starless Night'
        }]

  return (
    <Container disableGutters maxWidth={false} sx={{display:'grid',gridTemplateColumns:{xs:'repeat(1,auto)',sm:'repeat(2,auto)',lg:'repeat(3,auto)'},justifyContent:{xs:'center',lg:'space-between'},width:'100%',flexWrap:'wrap',gap:{xs:7,sm:'90px',lg:'0'}}}>
                {movies.map((movie,index)=> (
                    <Box key={index} sx={{width:359,display:'flex',flexDirection:'column',gap:'53px'}}>
                        <Box 
                        component='img'
                        src={movie.img}
                        sx={{width:359,height:507,borderRadius:'10px'}}/>
                        <Box>
                            <Typography variant='h3' sx={{textAlign:{xs:'center',md:'left'}}}>{movie.title}</Typography>
                            {/* cinema buttons */}
                            <Box sx={{display:'flex',height:26,gap:3,mt:'24px',justifyContent:{xs:'center',md:'flex-start'}}}>
                            <Button sx={{ background: (theme) => theme.customGradients.primary, fontSize: 12 }}>XXI</Button>
                                    <Button sx={{ bgcolor: 'cgv.main', fontSize: 12 }}>CGV</Button>
                                    <Button sx={{ bgcolor: 'cinepolis.main', fontSize: 12 }}>Cinépolis</Button>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Container>
  )
}

export default ComingsoonCard
