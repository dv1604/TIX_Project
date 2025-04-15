import { AppDataSource } from "../config/database";
import { seedMovies } from "./seedMovies";

AppDataSource.initialize()
    .then(async() => {
        console.log("Database Connected");
        // start seeding
        await seedMovies();
        console.log("Seeding completed successfully");
        process.exit(0);
    })
    .catch(err => {
        console.log("ERROR RECIEVED DURING SEEDING:\n",err)
    })
