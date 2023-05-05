import DBManager from '@/utils/database/database';
import HttpException from '@/utils/exceptions/http.exception';
import IToken from '@/utils/interfaces/token.interface';
import { verifyToken } from '@/utils/token';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer')) {
    return next(new HttpException(401, 'Unauthorised'));
  }

  const accessToken = bearer.split(' ')[1].trim();

  try {
    const payload: IToken | jwt.JsonWebTokenError = await verifyToken(
      accessToken
    );

    const prisma = DBManager.getPrisma();

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorised'));
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      return next(new HttpException(401, 'Unauthorised'));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unauthorised'));
  }
}

export default authenticatedMiddleware;
