import { PrismaClient } from '@prisma/client';

class DBManager {
  private static prisma: PrismaClient;

  public static getPrisma(): PrismaClient {
    if (!DBManager.prisma) {
      this.prisma = new PrismaClient();
    }
    return DBManager.prisma;
  }
}

export default DBManager;