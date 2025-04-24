import { getSeats } from '../controllers/seatController';
import { Router } from "express";

const router = Router();

router.get("/:slotId", getSeats);

export default router;