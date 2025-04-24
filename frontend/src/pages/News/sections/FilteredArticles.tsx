import { Box, Container, Divider, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectedFilteredArticles } from '../../../store/features/News/newsLogic'
import NewsCard from '../NewsCard'
import RecommendNews from '../../../components/RecommendNews'
import { useGetFilteredNewsMutation } from '../../../store/features/News/newsApi'
import { RootState } from '../../../store/store'
import { newsResponse } from '../../../types/newsResponse'


const FilteredArticles = () => {
  const filteredArticles = useSelector(selectedFilteredArticles);
  const theme = useTheme();
  const isMdm = useMediaQuery(theme.breakpoints.down('md'))

  const {selectedCategory, selectedKeyword ,searchQuery} = useSelector((state : RootState) => {
        return state.news
  })

  const [filteredNews, setFilteredNews] = useState<newsResponse[] | []>([]);

  const [getFilteredNews , {isLoading}] = useGetFilteredNewsMutation();

  useEffect(() => {

    const fetchNews = async() => {
      const newsDetails = await getFilteredNews({category:selectedCategory, keyword : selectedKeyword as string}).unwrap();
      const searchArticle = newsDetails.filter((news) => {
        return news.heading.toLowerCase().includes(searchQuery.toLowerCase())
      })
      if(searchQuery && searchQuery.trim().length > 0){
        
        setFilteredNews(searchArticle);
      }else{

        setFilteredNews(newsDetails);
      }
    }

    try{
      fetchNews();
    }catch(err){
      console.log(err)
    }

  },[selectedCategory,selectedKeyword, getFilteredNews, searchQuery])

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
        {filteredNews.length == 0 ?
          <h1>No Article Available</h1>
          : filteredNews.map((article, index) => (
            <Box
            key={index}
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
