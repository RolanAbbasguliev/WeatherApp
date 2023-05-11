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
const token_1 = __importDefault(require("@/utils/token"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
        this.prisma = database_1.default.getPrisma();
    }
    isValidPassword(password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                if (!user) {
                    throw new Error('Unable to find user by email');
                }
                return yield bcrypt_1.default.compare(password, user.password);
            }
            catch (err) {
                throw new http_exception_1.default(400, err);
            }
        });
    }
    /**
     * Register a new user
     */
    register(name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield this.prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        password: userPassword,
                        role: role,
                    },
                });
                console.log('4444');
                if (!user) {
                    throw new Error('Unable to create user');
                }
                const accessToken = token_1.default.createToken(user);
                return accessToken;
            }
            catch (err) {
                throw new http_exception_1.default(400, 'Unable to create user');
            }
        });
    }
    /**
     * Login user
     */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                if (!user) {
                    throw new Error('Unable to find user with that email address');
                }
                const res = yield this.isValidPassword(password, email);
                if (yield this.isValidPassword(password, email)) {
                    return token_1.default.createToken(user);
                }
                else {
                    throw new Error('Wrong credentials given');
                }
            }
            catch (err) {
                throw new http_exception_1.default(400, err.message);
            }
        });
    }
}
exports.default = UserService;
