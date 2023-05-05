import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import { WeatherAPICurrent } from '@/resources/weather/weather.dto';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class WeatherController implements Controller {
  public path = '/weather';
  public router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.get(`${this.path}`, authenticatedMiddleware, this.getWeather);
  }

  private getWeather = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let weatherCurrent: WeatherAPICurrent;

      const response = await fetch(
        'http://api.weatherapi.com/v1/forecast.json?key=7ddee4b4456940b09e962342232504&q=London&days=5&aqi=no&alerts=no'
      );
      console.log(response);

      res.status(201).json({ response });
    } catch (err: any) {
      next(new HttpException(400, err));
    }
  };
}

export default WeatherController;
