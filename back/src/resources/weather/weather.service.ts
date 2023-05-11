import { WeatherAPICurrent } from '@/resources/weather/weather.dto';
import DBManager from '@/utils/database/database';
import HttpException from '@/utils/exceptions/http.exception';
import { Prisma } from '@prisma/client';
import axios from 'axios';

class WeatherService {
  private prisma = DBManager.getPrisma();

  /**
   * Get Current Weather Info
   */

  public async getWeatherCurrentInfo(
    userId: number,
    city: string
  ): Promise<Error | WeatherAPICurrent> {
    try {
      const response = await axios.get<WeatherAPICurrent>(
        `http://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: `${process.env.WEATHER_API_KEY}`,
            q: `${city}`,
            aqi: 'no',
          },
        }
      );

      // const weatherInfo: Prisma.JsonArray = [];
      // weatherInfo.push(response.data)

      // const weatherCurrent = await this.prisma.weather.create({
      //   data: {
      //     userId: userId,
      //     weatherInfo: weatherInfo,
      //   },
      // });

      // const data = response.data as Prisma.;
      const weatherInfo = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          weather: true,
        },
      });

      const json = {
        ...response.data
      }

      const updateUserField = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          weather: json,
        },
      });

      console.log(updateUserField);

      return response!.data;
    } catch (err: any) {
      throw new HttpException(400, 'Unable to get current weather info');
    }
  }
}

export default WeatherService;
