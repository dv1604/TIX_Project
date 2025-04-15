import { Request, Response, Router } from 'express';
import { login, logout, requireAuth, signup } from '../controllers/authController';

const router =  Router();

router.post('/signup' , signup)

router.post('/login',login);

router.get('/checkauth', requireAuth);

router.get('/logout',logout);


export default router;
