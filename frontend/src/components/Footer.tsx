import { Box, Container, Grid, Icon, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import google from '../assests/google_play.png'
import apple from '../assests/apple_store.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ASSESTS from '../assests'

const Footer = () => {


  return (
    <Container maxWidth={false} disableGutters  sx={{borderTop:'1px solid rgba(189, 197, 212, 1)',maxWidth:'100vw', py:2,px:'72px' }}>
        <Grid container  spacing={5} sx={{margin:'auto',width:"100%"}}>
            {/* Logo Column */}
            <Grid  item xs={12}  lg={3} sx={{display:'flex',justifyContent:{xs:'center',lg:'flex-start'},alignItems:'flex-start'}}>
                <Box
                component='img'
                src={ASSESTS.images.logo}
                sx={{width:130}}/>
            </Grid>

            {/* Link Column */}
            <Grid
    item
    xs={12}
    md={6}
    lg={5}
    sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    }}
>
    {/* Added spacing to the Grid to create gaps */}
    <Grid
        container
        columnSpacing={{ xs: 3, sm: 6, lg: 3 }}
        alignItems="flex-start"
    >
        <Grid item xs={4}>
            <Stack sx={{ color: "secondary.main" }} spacing={1.5}>
                <Typography sx={{ color: "inherit" }} variant="h4">
                    Company
                </Typography>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Contact Us</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>About</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Partner</Link>
            </Stack>
        </Grid>

        <Grid item xs={4}>
            <Stack sx={{ color: "secondary.main" }} spacing={1.5}>
                <Typography sx={{ color: "inherit" }} variant="h4">
                    About
                </Typography>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>TIX ID News</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Cinema</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>My Tickets</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Payment</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Installments</Link>
            </Stack>
        </Grid>

        <Grid item xs={4}>
            <Stack sx={{ color: "secondary.main" }} spacing={1.5}>
                <Typography sx={{ color: "inherit" }} variant="h4">
                    Support
                </Typography>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Help Center</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Privacy Policy</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>FAQ</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Terms and Conditions</Link>
                <Link sx={{ color: "inherit", cursor: "pointer" }}>Covid-19 Updates</Link>
            </Stack>
        </Grid>
    </Grid>
</Grid>

            {/* Download Column */}
            <Grid item xs={12} md={6} lg={4}  sx={{display:'flex',justifyContent:'center'}}>
                <Box sx={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',gap:4}}>
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2}}>
                        <Typography variant='h4'>Follow Social Media</Typography>
                        <Stack direction='row' spacing={3}>
                            <Icon sx={{color:'secondary.main'}}><InstagramIcon/></Icon>
                            <Icon sx={{color:'secondary.main'}}><TwitterIcon/></Icon>
                            <Icon sx={{color:'secondary.main'}}><FacebookIcon/></Icon>
                        </Stack>
                    </Box>
                    <Box sx={{display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2}}>
                        <Typography variant='h4' sx={{color:'secondary.main'}}>Download TIX ID App</Typography>
                        <Stack direction='row' spacing={4}>
                            <Box 
                            component='img'
                            src={google}
                            sx={{width:110}}/>
                            <Box 
                            component='img'
                            src={apple}
                            sx={{width:110}}/>
                        </Stack>
                    </Box>
                    <Typography variant='body2' sx={{color:'secondary.main'}}>2025 TIX ID - PT Nusantara Elang Sejahtera.</Typography>
                </Box>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Footer
