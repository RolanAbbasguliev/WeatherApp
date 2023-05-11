"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("@/utils/database/database"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const axios_1 = __importDefault(require("axios"));
class WeatherService {
    constructor() {
        this.prisma = database_1.default.getPrisma();
    }
    /**
     * Get Current Weather Info
     */
    getWeatherCurrentInfo(userId, city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(`http://api.weatherapi.com/v1/current.json`, {
                    params: {
                        key: `${process.env.WEATHER_API_KEY}`,
                        q: `${city}`,
                        aqi: 'no',
                    },
                });
                // const weatherInfo: Prisma.JsonArray = [];
                // weatherInfo.push(response.data)
                // const weatherCurrent = await this.prisma.weather.create({
                //   data: {
                //     userId: userId,
                //     weatherInfo: weatherInfo,
                //   },
                // });
                // const data = response.data as Prisma.;
                const weatherInfo = yield this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                    select: {
                        weather: true,
                    },
                });
                const json = Object.assign({}, response.data);
                const updateUserField = yield this.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        weather: json,
                    },
                });
                console.log(updateUserField);
                return response.data;
            }
            catch (err) {
                throw new http_exception_1.default(400, 'Unable to get current weather info');
            }
        });
    }
}
exports.default = WeatherService;
