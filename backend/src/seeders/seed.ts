import { AppDataSource } from "../config/database";
import { seedMovies } from "./seedMovies";
import { seedNews } from "./seedNews";

AppDataSource.initialize()
    .then(async() => {
        console.log("Database Connected");
        // start seeding
        // await seedMovies();
        await seedNews();
        console.log("Seeding completed successfully");
        process.exit(0);
    })
    .catch(err => {
        console.log("ERROR RECIEVED DURING SEEDING:\n",err)
    })
