import { RootState } from "../../store";

export const selectedFilteredArticles = (state: RootState) => {
    const { articles, selectedCategory, selectedKeyword, searchQuery } = state.news;

    return articles.filter(article => {
        const matchCategory = article.category === selectedCategory;
        const matchesKeyword = selectedKeyword ? article.keywords.includes(selectedKeyword) : true;
        const matchesSearchQuery =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchCategory && matchesKeyword && matchesSearchQuery;
        return matchCategory && matchesKeyword && matchesSearchQuery;
    })
}

export const selectKeywords = (state: RootState) => state.news.keywords;
export const selectCategory = (state: RootState) => state.news.selectedCategory;