import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/auth/auth.interface';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        // Check if the auth header is present
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized to proceed!');
        }

        // Extract the token by removing 'Bearer ' from the auth header
        const token = authHeader.split(' ')[1];

        // Verify the token
        jwt.verify(token, config.jwt_access_secret as string, (err, decoded) => {
            if (err) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route');
            }

            const role = (decoded as JwtPayload).role;

            // Check if user has required role(s)
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.FORBIDDEN, 'You have no access to this route');
            }

            // Attach the decoded token to the request
            req.user = decoded as JwtPayload;
            next();
        });
    });
};

export default auth;
