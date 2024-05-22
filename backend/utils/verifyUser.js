import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyUser = (request, response, next) => {
    const token = request.cookies.access_token   // extract token from cookie (using cookie-parser)
    console.log(request);
    if (!token) return next(errorHandler(401, 'Unauthorized')) ;

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return next(errorHandler(403, 'Forbidden'));

        request.user = user // puts userid from jwt.verify into request.user
        next();
    });
};

