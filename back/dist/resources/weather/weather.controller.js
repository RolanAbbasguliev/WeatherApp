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
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
class WeatherController {
    constructor() {
        this.path = '/weather';
        this.router = (0, express_1.Router)();
        this.getWeather = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let weatherCurrent;
                const response = yield axios_1.default.get('http://api.weatherapi.com/v1/forecast.json?key=7ddee4b4456940b09e962342232504&q=London&days=5&aqi=no&alerts=no');
                // console.log(await response.json());
                res.status(201).json({ response });
            }
            catch (err) {
                next(new http_exception_1.default(400, err));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.get(`${this.path}`, authenticated_middleware_1.default, this.getWeather);
    }
}
exports.default = WeatherController;
