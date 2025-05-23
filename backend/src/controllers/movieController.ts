import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Movies } from "../entities/Movies";
import fileUpload from "express-fileupload";
import { imagekit } from "../config/imagekit";
import { generateSeats } from "../utitlity/generateSeats";

const movieRepo = AppDataSource.getRepository(Movies)

export const addMovie= async(req : Request , res : Response) => {

    const {title, genre, duration , rating , director } = req.body;

    if(!title || !genre || !duration || !rating || !director){
        res.status(400).json({error : "Please fill al fields"});
        return;
    }

    if(!req.files || !req.files.image){
        res.status(400).json({message:"Image is required"});
        return;
    }

    const imageFile = req.files.image as fileUpload.UploadedFile;
    const buffer = imageFile.data;
    const imageName = imageFile.name;

    
    try{
        // upload image to imagekit
        const uploadedResponse = await imagekit.upload({
            file : buffer,
            fileName :imageName
        })
        
        const newMovie = movieRepo.create({
            title,
            genre,
            duration,
            rating,
            director,
            image : uploadedResponse.url
        })

        const userFound = await movieRepo.findOneBy({title});

        if(userFound){
            res.status(400).json({message:"Movie Already exists"});
            return;
        }

        await movieRepo.save(newMovie);
        res.status(201).json({message:"New Movie Created"});
        return;

    }catch(err){
        // if(err && typeof err === "object" &&  'code' in err && err.code === '23505'){
        //     res.status(400).json({error:"Movie already exists"});
        //     return;
        // }
        res.status(400).json({message:"Error creating Movie"});
        return;
    }

}

export const getAllMovies = async(req:Request , res : Response) => {

  try{

    const movie = await movieRepo.find();
    res.status(200).json(movie);
    return;

  }catch(err){
    res.status(400).json({message: "Error fetching movies"});
    return;
  }

}
