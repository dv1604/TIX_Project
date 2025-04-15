import { Router } from "express";
import { cityShowingData } from "../controllers/cityShowingController";
import { getAllMovies } from "../controllers/movieController";

const router = Router();

router.get("/:movieId", cityShowingData);
router.get("/",getAllMovies)

export default router;
