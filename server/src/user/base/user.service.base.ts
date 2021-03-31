import { PrismaService } from "nestjs-prisma";

import {
  FindOneUserArgs,
  FindManyUserArgs,
  UserCreateArgs,
  UserUpdateArgs,
  UserDeleteArgs,
  Subset,
  User,
  FindManyProjectArgs,
  Project,
  FindManyTaskArgs,
  Task,
} from "@prisma/client";

import { PasswordService } from "../../auth/password.service";
import { transformStringFieldUpdateInput } from "../../prisma.util";

export class UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {}

  async findMany<T extends FindManyUserArgs>(
    args: Subset<T, FindManyUserArgs>
  ): Promise<User[]> {
    return this.prisma.user.findMany(args);
  }
  async findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): Promise<User | null> {
    return this.prisma.user.findOne(args);
  }
  async create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): Promise<User> {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    });
  }
  async update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): Promise<User> {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password &&
          (await transformStringFieldUpdateInput(
            args.data.password,
            (password) => this.passwordService.hash(password)
          )),
      },
    });
  }
  async delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): Promise<User> {
    return this.prisma.user.delete(args);
  }

  async findProjects(
    parentId: string,
    args: FindManyProjectArgs
  ): Promise<Project[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .projects(args);
  }

  async findTasks(parentId: string, args: FindManyTaskArgs): Promise<Task[]> {
    return this.prisma.user
      .findOne({
        where: { id: parentId },
      })
      .tasks(args);
  }
}
