import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ERROR_CODE, ERROR_MESSAGE } from '../helpers/constants';
import { JwtPayload } from '../interfaces/Auth';

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error('JWT_SECRET is not set');
}


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(ERROR_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGE.ACCESS_DENIED });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex)
    return res.status(ERROR_CODE.UNAUTHORIZED).json({ message: ERROR_MESSAGE.ACCESS_DENIED });
  }
};
