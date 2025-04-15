import { app } from "./app";
import { AppDataSource } from "./config/database";

AppDataSource.initialize()
    .then( () => {
        console.log('Connected with Database Successfully');
        
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT} `)
        })
    })
    .catch(err => {
        console.log(`ERROR RECIEVED : \n  ${err}`)
    }) 