import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import SmallNewsCard from './Cards/SmallNewsCard'
import { Container } from '@mui/material'
import { newsResponse } from '../types/newsResponse'
import { useGetAllNewsQuery, useGetFilteredNewsMutation } from '../store/features/News/newsApi'

const RecommendNews: React.FC<{
    currentArticleId?: number
}> = ({ currentArticleId }) => {

    const [articleDetails,setArticleDetails] = useState<newsResponse[] | []>([])

    const {data , isLoading} = useGetAllNewsQuery();


    const articles = data;

    const filteredArticles = currentArticleId ?
        articles?.filter(article => article.id !== currentArticleId) : articles;

    const recommended = filteredArticles && [...filteredArticles].sort(() => 0.5 - Math.random()).slice(0, 3)


    return (
    
            <Container disableGutters
                maxWidth={false}
                sx={{ display: 'flex', 
                flexDirection: { xs: 'column', lg: 'row' }, justifyContent: { xs: 'center', xl: 'space-between' }, 
                gap: { xs: 2 }, 
                alignItems: {xs:'center',lg:'flex-start'} }}>
                {recommended?.map((article, index) => (
                    <SmallNewsCard
                        key={index}
                        news={article} />
                ))}
            </Container>
    )
}

export default RecommendNews
