import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }


    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async getUserDetails(id: string): Promise<User> {
        console.log(id);
        const user = await this.prisma.user.findMany({ where: { id: id } })[0];
        if (user === undefined)
            throw new NotFoundException(`User with id ${id} not found`);

        return user;
    }
}
