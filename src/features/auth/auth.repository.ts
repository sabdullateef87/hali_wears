import { HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseException } from "src/common/exceptions";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) { };

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      console.log("Type of error " + typeof error);

      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new DatabaseException(`Record already exist`, HttpStatus.CONFLICT);
      }
      throw new DatabaseException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {

    const { where, data } = params;
    return await this.prisma.user.update({ where, data });
  }

  async getUserByEmailOrUserName(username?: string, email?: string) {
    return null;
  }
}