import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import { WeatherAPICurrent } from '@/resources/weather/weather.dto';
import WeatherService from '@/resources/weather/weather.service';
import validate from '@/resources/weather/weather.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class WeatherController implements Controller {
  public path = '/weather';
  public router = Router();
  private weatherService = new WeatherService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.getWeatherCurrentInfo),
      authenticatedMiddleware,
      this.getWeatherCurrentInfo
    );
  }

  private getWeatherCurrentInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { city } = req.body;

      const weatherInfo: WeatherAPICurrent | Error =
        await this.weatherService.getWeatherCurrentInfo(req.user.id, city);

      res.status(201).json({ weatherInfo });
    } catch (err: any) {
      next(new HttpException(400, err));
    }
  };
}

export default WeatherController;
