import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import SmallNewsCard from './Cards/SmallNewsCard'
import { Container } from '@mui/material'

const RecommendNews: React.FC<{
    currentArticleId?: number
}> = ({ currentArticleId }) => {

    const articles = useSelector((state: RootState) => (
        state.news.articles || []
    ))

    const filteredArticles = currentArticleId ?
        articles.filter(article => article.id !== currentArticleId) : articles;

    const recommended = [...filteredArticles].sort(() => 0.5 - Math.random()).slice(0, 3)


    return (
    
            <Container disableGutters
                maxWidth={false}
                sx={{ display: 'flex', 
                flexDirection: { xs: 'column', lg: 'row' }, justifyContent: { xs: 'center', xl: 'space-between' }, 
                gap: { xs: 2 }, 
                alignItems: {xs:'center',lg:'flex-start'} }}>
                {recommended.map((article, index) => (
                    <SmallNewsCard
                        key={index}
                        news={article} />
                ))}
            </Container>
    )
}

export default RecommendNews
