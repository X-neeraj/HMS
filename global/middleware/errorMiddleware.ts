
import { Request,Response,NextFunction } from "express";
import appError from "../errors/appError";
const config = require("../../config.js")


export const errorHandler = (err:appError, req:Request, res:Response, next:NextFunction) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (config.enviornment === 'development') {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
        });
    }
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message || 'Something went wrong!',
    });
};
