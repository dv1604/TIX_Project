import { Router } from "express";
import { getAllNews, getFilteredNews, getKeywordsByCategory, getNewsById } from "../controllers/newsController";

const router = Router();

router.get('/', getFilteredNews);
router.get('/all', getAllNews);
router.get('/keywords', getKeywordsByCategory);
router.get('/:id', getNewsById);

export default router;