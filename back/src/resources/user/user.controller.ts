import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import UserService from '@/resources/user/user.service';
import validate from '@/resources/user/user.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { Role } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';

class UserController implements Controller {
  public path = '/users';
  public router = Router();

  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );

    this.router.get(`${this.path}`, authenticatedMiddleware, this.findUser);
  }

  private findUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      res.status(201).send(req.user);
    } catch (err: any) {
      next(new HttpException(400, err.message));
    }
  };

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, email, password } = req.body;

      const token = await this.UserService.register(
        name,
        email,
        password,
        Role.USER
      );
      res
        .cookie('accessToken', token, {
          maxAge: 1000 * 60 * 60 * 24 * 5,
          httpOnly: true,
        })
        .status(201);

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const token = await this.UserService.login(email, password);
      res
        .cookie('accessToken', token, {
          maxAge: 1000 * 60 * 60 * 24 * 5,
          httpOnly: true,
        })
        .status(201);

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error));
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (!req.user) {
      return next(new HttpException(404, 'No logged in user'));
    }

    res.status(200).json({ user: req.user });
  };
}

export default UserController;
