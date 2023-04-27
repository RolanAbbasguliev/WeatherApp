import ErrorMiddleware from '@/middleware/error.middleware';
import DataBaseManager from '@/utils/database/database';
import IController from '@/utils/interfaces/controller.interface';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

mongoose.set('strictQuery', false);

class App {
  public express: Application;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
  }

  private initializeControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
      this.express.use('/api', controller.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  private initializeDatabaseConnection(): void {
    const databaseManager: DataBaseManager = new DataBaseManager(
      process.env.POSTGRES_NAME as string,
      process.env.POSTGRES_HOST as string,
      process.env.POSTGRES_PASSWORD as string,
      process.env.POSTGRES_DB as string,
      Number(process.env.POSTGRES_PORT)
    );
    // pool.connect().then(client => {
    //   console.log("CONNECTED");
    // })
    // const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

    // mongoose.connect(
    //   `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
    // );
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }
}

export default App;
