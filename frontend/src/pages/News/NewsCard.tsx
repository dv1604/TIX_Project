import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import ASSESTS from '../../assests'
import { useNavigate } from 'react-router'
import { newsResponse } from '../../types/newsResponse'

const NewsCard : React.FC<{
    article:newsResponse,
    index : number
}> = ({article,index}) => {
    const theme = useTheme();
    const isMdm = useMediaQuery(theme.breakpoints.down('md'))
    const isEven = index%2 == 0
    const navigate = useNavigate();

    const handleClick = () => {
       
        if (article.category === 'Video' && article.videoUrl) {
          navigate(`/video/${article.id}`);
        } else {
          navigate(`/news/${article.id}`);
        }
      };

    return (
        <Container 
        className='newscard'
        disableGutters
            maxWidth={false}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection:{xs:'column',sm: isEven ? 'row' : 'row-reverse'},
                justifyContent: isEven ? 'flex-start' : 'flex-end',
                gap:8,
                alignItems: 'center',
                margin:0
            }}>
            <Box
                component='img'
                src={article.image}
                sx={{
                    borderRadius: '10px',
                    width: {xs:350,md:400,lg:500,xl:585},
                    height: {md:300,lg:380,xl:410},
                    objectFit:'cover',
                    cursor:'pointer',
                    aspectRatio: "16/9",
                }} 
                onClick={handleClick}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '24px',
                    minWidth:{md:'450px',lg:'500px',xl:'600px'}
                }}>

                {/* category */}
                <Typography
                    variant='caption'
                    sx={{ textTransform: 'capitalize', 
                        border: '1px solid',
                        borderColor:'lightgrey.main',
                        borderRadius:'0', 
                        color: 'secondary.main', 
                        width: 'fit-content', 
                        padding: 1 ,
                        bgcolor:'inherit', 
                        fontSize: '16px'}}>{article.category}</Typography>
                {/* title */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    <Typography variant='h1'
                    sx={{
                        color:'secondary.main',
                        fontSize:{xs:'24px',lg:'28px',xl:'32px'}
                    }}>
                        {article.heading}
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            color:'grey.600'
                        }}>
                        {article.description.substring(0,150)}...
                    </Typography>
                </Box>
                <Typography
                    variant='body2'
                    sx={{
                        color:'grey.700'
                    }}>
                    17 Nov 2021 | TIX ID
                </Typography>
            </Box>
        </Container>
    )
}

export default NewsCard
