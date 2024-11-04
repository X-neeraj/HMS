import jwt from 'jsonwebtoken';
const config = require("../../config.js")
import { Request } from "express";


export const generateJwtToken = (role : boolean,userId:any): string => {
    return jwt.sign({ _id:userId,owner: role }, config.jwt_key, { expiresIn: '6h' });
};

export const verifyJwtToken = (token: string): any => {
    return jwt.verify(token, config.jwt_key);
};

export interface authRequest extends Request {
    user?:any;
}

