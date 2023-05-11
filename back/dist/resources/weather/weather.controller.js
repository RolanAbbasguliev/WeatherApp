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
const authenticated_middleware_1 = __importDefault(require("@/middleware/authenticated.middleware"));
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const weather_service_1 = __importDefault(require("@/resources/weather/weather.service"));
const weather_validation_1 = __importDefault(require("@/resources/weather/weather.validation"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const express_1 = require("express");
class WeatherController {
    constructor() {
        this.path = '/weather';
        this.router = (0, express_1.Router)();
        this.weatherService = new weather_service_1.default();
        this.getWeatherCurrentInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { city } = req.body;
                const weatherInfo = yield this.weatherService.getWeatherCurrentInfo(req.user.id, city);
                res.status(201).json({ weatherInfo });
            }
            catch (err) {
                next(new http_exception_1.default(400, err));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(weather_validation_1.default.getWeatherCurrentInfo), authenticated_middleware_1.default, this.getWeatherCurrentInfo);
    }
}
exports.default = WeatherController;
