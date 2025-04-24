import { AppDataSource } from "../config/database";
import { Keyword } from "../entities/Keyword";
import { News } from "../entities/News";
import { newsData } from "./data/newsData";

const newsRepo = AppDataSource.getRepository(News);
const keywordRepo = AppDataSource.getRepository(Keyword);

export const seedNews = async() =>{

    for(const news of newsData){

        // Find or create keywords
        const keywordEntities: Keyword[] = [];

        for(const keyword of news.keywords){

            let keywordFound = await keywordRepo.findOneBy({name : keyword});

            if(!keywordFound){

                const newKeyword = keywordRepo.create({
                    name : keyword
                });

                keywordFound = await keywordRepo.save(newKeyword);
            }

            keywordEntities.push(keywordFound);
        }

            const newNews = newsRepo.create({
                heading : news.heading,
                category : news.category,
                description : news.description,
                image :news.image,
                keywords : keywordEntities,
                releaseDate : news.releaseDate,
                ...(news.videoUrl && { videoUrl: news.videoUrl }),
                
            })

            await newsRepo.save(newNews);
        
    }

    console.log("News and keywords seeded successfully.");

}