import DBManager from '@/utils/database/database';
import token from '@/utils/token';
import bcrypt from 'bcrypt';
import HttpException from '../../utils/exceptions/http.exception';

class UserService {
  private prisma = DBManager.getPrisma();
  public async isValidPassword(
    password: string,
    email: string
  ): Promise<Error | boolean | undefined> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error('Unable to find user by email');
      }

      return await bcrypt.compare(password, user.password);
    } catch (err: any) {
      console.log(err);
    }
  }
  /**
   * Register a new user
   */
  public async register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<Error | string | undefined> {
    try {
      const userPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          name: name,
          email: email,
          password: userPassword,
        },
      });

      if (!user) {
        throw new Error('Unable to create user');
      }
      const accessToken = token.createToken(user);
      return accessToken;
    } catch (err: any) {
      throw new HttpException(400, 'Unable to create user');
    }
  }

  /**
   * Login user
   */
  public async login(
    email: string,
    password: string
  ): Promise<Error | string | undefined> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new Error('Unable to find user with that email address');
      }

      const res = await this.isValidPassword(password, email);

      if (await this.isValidPassword(password, email)) {
        return token.createToken(user);
      } else {
        throw new Error('Wrong credentials given');
      }
    } catch (err: any) {
      throw new HttpException(400, err);
    }
  }
}

export default UserService;
