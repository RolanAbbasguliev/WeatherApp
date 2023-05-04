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
const validation_middleware_1 = __importDefault(require("@/middleware/validation.middleware"));
const user_service_1 = __importDefault(require("@/resources/user/user.service"));
const user_validation_1 = __importDefault(require("@/resources/user/user.validation"));
const http_exception_1 = __importDefault(require("@/utils/exceptions/http.exception"));
const express_1 = require("express");
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const token = yield this.UserService.register(name, email, password, 'user');
                res
                    .cookie('accessToken', token, {
                    maxAge: 432000000,
                    httpOnly: true,
                })
                    .status(201);
                res.status(201).json({ token });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.UserService.login(email, password);
                res
                    .cookie('accessToken', token, {
                    maxAge: 432000000,
                    httpOnly: true,
                })
                    .status(201);
                res.status(201).json({ token });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
        // this.router.get(`${this.path}`, authenticated, this.getUser);
    }
}
exports.default = UserController;
