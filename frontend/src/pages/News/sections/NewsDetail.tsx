import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { RootState } from '../../../store/store';
import { Box, Container, Icon, Stack, Typography } from '@mui/material';
import { Facebook, Instagram, Recommend, Twitter } from '@mui/icons-material';
import RecommendNews from '../../../components/RecommendNews';

const NewsDetail = () => {

    const { id } = useParams();
    const article = useSelector((state: RootState) => (
        state.news.articles.find((article) => article.id === Number(id))
    ))

    if (!article) {
        return <h1>Article not found</h1>
    }
    return (
        <Container
        disableGutters
        maxWidth={false}
        sx={{
            maxWidth: '80%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <Container
                disableGutters
                maxWidth={false}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    gap: 5,
                    maxWidth: 858,
                    marginTop: '30px'
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                    <Typography
                        variant='h1'
                        sx={{
                            fontWeight: 'bold',
                            color: 'secondary.main'
                        }}>
                        {article.title}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            color: 'grey.600'
                        }}>
                        17 Nov 2021 | TIX ID
                    </Typography>
                </Box>
                <Box
                    component='img'
                    src={article.image}
                    sx={{
                        maxWidth: {xs:600,sm:700,lg:858},
                        height: {xs:300,sm:400,lg:447},
                        borderRadius: '10px',
                        objectFit: 'cover'
                    }} />
                <Typography
                    variant='body1'
                    sx={{
                        color: 'grey.900',
                        width: {lg:748},
                        whiteSpace: 'pre-line'
                    }}>
                    {article.description}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                    }}>
                    <Typography
                        variant='h3'>
                        Share this article
                    </Typography>
                    <Stack direction='row' spacing={1.5}>
                        <Icon sx={{ color: 'secondary.main' }}><Instagram /></Icon>
                        <Icon sx={{ color: 'secondary.main' }}><Twitter /></Icon>
                        <Icon sx={{ color: 'secondary.main' }}><Facebook /></Icon>
                    </Stack>
                </Box>
            </Container>
            <Box sx={{
                marginTop: '50px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                gap:2
            }}>
                <Typography
                    variant='h2'>
                    See Other Articles
                </Typography>
                <RecommendNews currentArticleId={Number(id)} />
            </Box>
        </Container>
    )
}

export default NewsDetail
