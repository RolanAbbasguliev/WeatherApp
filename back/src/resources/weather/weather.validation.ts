import Joi from 'joi';

const getWeatherCurrentInfo = Joi.object({
  city: Joi.string().required(),
});

export default { getWeatherCurrentInfo };
