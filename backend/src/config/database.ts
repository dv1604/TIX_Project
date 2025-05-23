import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config()

export const AppDataSource = new DataSource({
    type : 'postgres',
    host : process.env.DATABASE_HOST,
    port : Number(process.env.DATABASE_PORT),
    username : process.env.DATABASE_USER,
    database : process.env.DATABASE_NAME,
    password : process.env.DATABASE_PASSWORD,
    entities : ['./src/entities/*{.ts,.js}*'],
    synchronize : false,
    logging : false,
    migrations : ["src/migrations/*.ts"]
})