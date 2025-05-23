import { Router } from 'express';
import { addMovie, getAllMovies } from '../controllers/movieController';
import { getfilterOptions } from '../controllers/filterController';
const router = Router();

router.get('/options/:movieId',getfilterOptions);

export default router;
