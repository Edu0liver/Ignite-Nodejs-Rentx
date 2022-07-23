import { AppError } from '@shared/errors/AppErrors';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';

interface IPayload {
    sub: string;
}

export async function ensuredAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token Missing!", 401);
    }

    const [, token] = authHeader.split(" ");
    
    try{
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        request.user = {
            id: user_id,
        }

        next();
    }catch{
        throw new AppError("Invalid Token!", 401);
    }
}