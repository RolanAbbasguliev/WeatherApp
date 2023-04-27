import UserModel from '@/resources/user/user.model';
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
    return next(new HttpException(401, 'Unuathorised'));
  }

  const accessToken = bearer.split('Bearer: ')[0].trim();

  try {
    const payload: IToken | jwt.JsonWebTokenError = await verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unuathorised'));
    }
    const user = await UserModel.findById(payload.id)
      .select('-password')
      .exec();

    if (!user) {
      return next(new HttpException(401, 'Unuathorised'));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unuathorised'));
  }
}

export default authenticatedMiddleware;