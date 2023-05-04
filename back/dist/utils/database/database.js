"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class DBManager {
    static getPrisma() {
        if (!DBManager.prisma) {
            this.prisma = new client_1.PrismaClient();
        }
        return DBManager.prisma;
    }
}
exports.default = DBManager;
