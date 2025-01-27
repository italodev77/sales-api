import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.');
    }
    //sep o bearer token
    const [, token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token, authConfig.jwt.secret);
        //para ter acesso ao id do user no token

        const { sub } = decodeToken as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token.');
    }
}
