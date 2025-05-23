import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { News } from "../entities/News";
import { Keyword } from "../entities/Keyword";

const newsRepo = AppDataSource.getRepository(News);
const keywordRepo = AppDataSource.getRepository(Keyword);

export const getFilteredNews = async (req: Request, res: Response) => {

    try {

        const { category, keyword } = req.query;

        let query = newsRepo
            .createQueryBuilder("news")
            .leftJoinAndSelect("news.keywords", "keyword");

        if (category) {
            query = query.andWhere("news.category = :category", { category });
        }

        if (keyword) {
            query = query.andWhere("keyword.name = :keyword", { keyword });
        }

        const filteredNews = await query.getMany();

        res.status(200).json(filteredNews);

    } catch (err) {

        console.log(err)
        res.status(500).json({ message: "Internal Seerver Error" });
        return;

    }

}

export const getKeywordsByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;

        const keywords = await newsRepo
            .createQueryBuilder("news")
            .leftJoinAndSelect("news.keywords", "keyword")
            .where("news.category = :category", { category })
            .select(["keyword.id", "keyword.name"]) // Explicit select!
            .getRawMany();


        res.status(200).json(keywords);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getNewsById = async(req : Request , res : Response) => {

    
    try{
        const {id} = req.params;

        const news = await newsRepo.findOne({
            where : {
                id : Number(id)
            }
        });

        if(!news){
            res.status(404).json({
                message : "News Not Found"
            });
            return;
        }

        res.status(200).json(news);
        return;

    }catch(err){
        res.status(500).json({
            message : "Internal Server Error"
        })
        return;
    }

}

export const getAllNews = async(req:Request , res : Response) => {

  try{

    const news = await newsRepo.find();
    res.status(200).json(news);
    return;

  }catch(err){
    res.status(400).json({message: "Error fetching news"});
    return;
  }

}
