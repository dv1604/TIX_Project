import { Box, Container, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectedFilteredArticles } from '../../../store/features/News/newsLogic'
import NewsCard from '../NewsCard'
import RecommendNews from '../../../components/RecommendNews'

const FilteredArticles = () => {
  const filteredArticles = useSelector(selectedFilteredArticles);
  const theme = useTheme();
  const isMdm = useMediaQuery(theme.breakpoints.down('md'))


  return (
    <Container className='filtered'
      disableGutters
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '70px'
      }}>
      <Container

        disableGutters
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          margin: 0,
          alignItems: 'flex-start',
          marginTop: '60px',
          gap: 5
        }}>
        {filteredArticles.length == 0 ?
          <h1>No Article Available</h1>
          : filteredArticles.map((article, index) => (
            <Box
            sx={{
              display:'flex',
              flexDirection:'column',
              gap:4
            }}>
              <NewsCard
                key={index}
                article={article}
                index={index}
              />
              {isMdm && index !== filteredArticles.length-1 && <Divider 
              sx={{
                bgcolor:'grey.400'
              }}/>}
            </Box>
            ))
            }

      </Container>
      <Typography
      sx={{
        fontSize:'30px',
        fontWeight:700,
        textAlign:'center'      }}>See Other Articles</Typography>
      <RecommendNews />
    </Container>
  )
}

export default FilteredArticles
