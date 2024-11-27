import { ConflictException, Injectable } from "@nestjs/common";

import { hash } from "argon2";

import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const user = await this.findUserByEmail(data.email);
    if (user) throw new ConflictException("User already exists.");

    const hashedPassword = await hash(data.password);
    await this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      message: "User created.",
    };
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findUserById(id: string) {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }
}
