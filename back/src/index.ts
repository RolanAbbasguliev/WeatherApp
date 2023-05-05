import 'dotenv/config';
import 'module-alias/register';

import validateEnv from '@/utils/validateEnv';
import App from './app';

import UserController from '@/resources/user/user.controller';
import WeatherController from '@/resources/weather/weather.controller';
// check env variables

validateEnv();

const app = new App(
  [new UserController(), new WeatherController()],
  Number(process.env.PORT)
);
app.listen();
