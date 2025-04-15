import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'; // Ensure you have imported jwt

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
 const token = req.cookies.jwt;

    // Check if jwt token exists
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY as string, (err: unknown, decoded: unknown) => {
            if (err) {
                res.json({ isAuthenticated: false });
            } else {
                next(); // Proceed to the next middleware if the token is valid
            }
        });
    } else {
        res.json({ isAuthenticated: false }); // Handle case where token is missing
    }
};