import { Router } from 'express';
import { addMovie, getAllMovies } from '../controllers/movieController';
import { getfilterOptions } from '../controllers/filterController';
const router = Router();

router.get('/options',getfilterOptions);

export default router;
