import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signToken = (payload: object) => jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
export const verifyToken = (token: string) => jwt.verify(token, env.jwtSecret);
