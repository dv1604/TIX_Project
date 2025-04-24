import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Users } from "../entities/Users";
import { validate, ValidationError } from "class-validator";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';

const userRepo = AppDataSource.getRepository(Users);

// Error Array 
const handleErrors = (err: unknown) => {

    let errors: Record<string, string> = { email: "", phoneNumber: "", password: "" };

    if (typeof err === "object" && err !== null) {

        // Handle validation errors (class-validator)
        if (Array.isArray(err) && err.length > 0 && "target" in err[0]) {

            err.forEach((validationError: ValidationError) => {

                // extract error message from constratints
                if (validationError.constraints) {
                    const property = validationError.property;
                    const errorMessage = Object.values(validationError.constraints).join(", ");
                    errors[property] = errorMessage;
                    console.log(property, errorMessage)
                }
            });
        }

        // Handle database errors (TypeORM unique constraint violations)
        if ("code" in err) {
            const errorCode = (err as Record<string, unknown>)["code"];
            const detail = (err as Record<string, unknown>)["detail"] as string;

            // for duplicate data
            if (errorCode === "23505") {
                if (detail.includes("email")) {
                    errors.email = "Email already exists";
                } else if (detail.includes("phoneNumber")) {
                    errors.phoneNumber = "Phone Number already exists";
                }
            }
        }
    }

    return errors;
}

// creating json web token
const age = 6 * 60 *60; //6hrs in ms
const createToken = (email : string) => {

    return jwt.sign({email}, process.env.SECRET_KEY  as string, {
        expiresIn : age
    })

}
 

export const signup = async (req: Request, res: Response) => {

    const { name, phoneNumber, email, password } = req.body;

    const newUser = new Users();
    newUser.name = name;
    newUser.phoneNumber = phoneNumber;
    newUser.email = email;
    newUser.password = password;


    const errors = await validate(newUser);
    if (errors.length > 0) {
        res.status(400).json(handleErrors(errors));
        return;
    }

    try {

        await userRepo.save(newUser);
        const token = createToken(email);
        res.cookie('jwt',token,{
            httpOnly : true ,
            maxAge : 1000 * age
        });
        res.status(201).send('New User Created');
    } catch (err) {
        res.status(400).json(handleErrors(err))
    }

}

export const login = async (req: Request, res: Response) => {

    const { phoneNumber, password } = req.body;

    try {
        const userFound = await userRepo.findOneBy({ phoneNumber })

        if (!userFound) {

            res.status(400).json({error : 'No User Found'});
            return;
            
        }

        const passwordCheck = await compare(password, userFound.password);
        if (!passwordCheck) {
            res.status(400).json({error : 'Incorrect Password'});
            return;
        }
        
        const token = createToken(userFound.email);
        res.cookie('jwt',token,{
            httpOnly : true ,
            maxAge : 1000 * age
        });
        res.json({message:'Login Succesfully',name:userFound.name});
        return;

    } catch (err) {
        res.status(500).json({error : "Internal Server Error"})
    }


}

export const logout = async (req: Request, res: Response) => {
    res.cookie("jwt", "", { maxAge: 1 }); // Clears JWT
    res.status(200).json({ message: "Logged out successfully" });
};

export const requireAuth = (req: Request, res: Response) => {
try{
    const token = req.cookies?.jwt;
    // console.log(token)

    if(!token){
        res.json({isAuthenticated : false});
        return;
    }

    jwt.verify(token, process.env.SECRET_KEY as string, async(err: unknown , decoded : any)=>{
        console.log(decoded.email)
        if(err){

            res.json({isAuthenticated :  false});
            return;
        }

        const user = await userRepo.findOneBy({email : decoded.email})
        
        if (!user) {
            res.json({ isAuthenticated: false });
            return;
        }

        console.log(user.id)

        res.json({isAuthenticated: true, id : user.id})
    })}catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
}