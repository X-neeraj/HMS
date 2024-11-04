import { Request, Response, NextFunction } from 'express';
import { verifyJwtToken } from '../utils/common';

interface authRequest extends Request {
    user?: any
}
exports.authMiddleware = (req: authRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token)  return res.status(401).json({ message: 'Login First, authorization denied' });
    try {
        const decoded = verifyJwtToken(token);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Login Expired',error });
    }
};
