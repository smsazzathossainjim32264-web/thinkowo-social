import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwt';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });

  try {
    const payload = verifyToken(auth.split(' ')[1]) as { id: string; role: 'USER' | 'CREATOR' | 'ADMIN' };
    req.user = { id: payload.id, role: payload.role };
    return next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
  }
  return next();
};
