import { PrismaService } from "nestjs-prisma";

import {
  FindOneProjectArgs,
  FindManyProjectArgs,
  ProjectCreateArgs,
  ProjectUpdateArgs,
  ProjectDeleteArgs,
  Subset,
  Project,
  FindManyTaskArgs,
  Task,
  User,
} from "@prisma/client";

export class ProjectServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyProjectArgs>(
    args: Subset<T, FindManyProjectArgs>
  ): Promise<Project[]> {
    return this.prisma.project.findMany(args);
  }
  async findOne<T extends FindOneProjectArgs>(
    args: Subset<T, FindOneProjectArgs>
  ): Promise<Project | null> {
    return this.prisma.project.findOne(args);
  }
  async create<T extends ProjectCreateArgs>(
    args: Subset<T, ProjectCreateArgs>
  ): Promise<Project> {
    return this.prisma.project.create<T>(args);
  }
  async update<T extends ProjectUpdateArgs>(
    args: Subset<T, ProjectUpdateArgs>
  ): Promise<Project> {
    return this.prisma.project.update<T>(args);
  }
  async delete<T extends ProjectDeleteArgs>(
    args: Subset<T, ProjectDeleteArgs>
  ): Promise<Project> {
    return this.prisma.project.delete(args);
  }

  async findTasks(parentId: string, args: FindManyTaskArgs): Promise<Task[]> {
    return this.prisma.project
      .findOne({
        where: { id: parentId },
      })
      .tasks(args);
  }

  async getOwner(parentId: string): Promise<User | null> {
    return this.prisma.project
      .findOne({
        where: { id: parentId },
      })
      .owner();
  }
}
