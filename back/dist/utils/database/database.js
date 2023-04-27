"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
// export const pool = new Client({
//   user: 'dbName',
//   host: 'localhost',
//   password: 'dbPassword',
//   database: 'postgres',
//   port: 5438,
// });
class DataBaseManager {
    constructor(user, host, password, database, port) {
        this.user = user;
        this.host = host;
        this.password = password;
        this.database = database;
        this.port = port;
        this.client = new pg_1.Client({
            user: this.user,
            host: this.host,
            password: this.password,
            database: this.database,
            port: this.port,
        });
        this.client.connect((client) => {
            console.log(`Connected ${this.user}, ${this.database} on port: ${this.port}`);
        });
        this.createUserTable();
    }
    createUserTable() {
        const querySQL = ` 
      CREATE TABLE User (
        id SERIAL,
        first_name VARCHAR(30) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password VARCHAR(30) NOT NULL,
        UNIQUE(email)
      );
    `;
        try {
            this.client.query(querySQL, (error, res) => {
                if (error) {
                    throw new Error('Unable to create User table');
                }
                else {
                    console.log(`User table was created: ${res}`);
                }
            });
        }
        catch (error) {
            throw new http_exception_1.default(400, `Unable to create User table!: \n${error}`);
        }
    }
}
exports.default = DataBaseManager;
