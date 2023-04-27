import { Client } from 'pg';
import HttpException from '../exceptions/http.exception';

// export const pool = new Client({
//   user: 'dbName',
//   host: 'localhost',
//   password: 'dbPassword',
//   database: 'postgres',
//   port: 5438,
// });

class DataBaseManager {
  private user: string;
  private host: string;
  private password: string;
  private database: string;
  private port: number;

  public client: Client;

  constructor(
    user: string,
    host: string,
    password: string,
    database: string,
    port: number
  ) {
    this.user = user;
    this.host = host;
    this.password = password;
    this.database = database;
    this.port = port;
    this.client = new Client({
      user: this.user,
      host: this.host,
      password: this.password,
      database: this.database,
      port: this.port,
    });

    this.client.connect((client) => {
      console.log(
        `Connected ${this.user}, ${this.database} on port: ${this.port}`
      );
    });

    this.createUserTable();
  }

  private createUserTable(): void {
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
        } else {
          console.log(`User table was created: ${res}`);
        }
      });
    } catch (error) {
      throw new HttpException(400, `Unable to create User table!: \n${error}`);
    }
  }
}

export default DataBaseManager;
