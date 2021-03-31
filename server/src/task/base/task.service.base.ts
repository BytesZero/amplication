import { PrismaService } from "nestjs-prisma";

import {
  FindOneTaskArgs,
  FindManyTaskArgs,
  TaskCreateArgs,
  TaskUpdateArgs,
  TaskDeleteArgs,
  Subset,
  Task,
  User,
  Project,
} from "@prisma/client";

export class TaskServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyTaskArgs>(
    args: Subset<T, FindManyTaskArgs>
  ): Promise<Task[]> {
    return this.prisma.task.findMany(args);
  }
  async findOne<T extends FindOneTaskArgs>(
    args: Subset<T, FindOneTaskArgs>
  ): Promise<Task | null> {
    return this.prisma.task.findOne(args);
  }
  async create<T extends TaskCreateArgs>(
    args: Subset<T, TaskCreateArgs>
  ): Promise<Task> {
    return this.prisma.task.create<T>(args);
  }
  async update<T extends TaskUpdateArgs>(
    args: Subset<T, TaskUpdateArgs>
  ): Promise<Task> {
    return this.prisma.task.update<T>(args);
  }
  async delete<T extends TaskDeleteArgs>(
    args: Subset<T, TaskDeleteArgs>
  ): Promise<Task> {
    return this.prisma.task.delete(args);
  }

  async getAssignedTo(parentId: string): Promise<User | null> {
    return this.prisma.task
      .findOne({
        where: { id: parentId },
      })
      .assignedTo();
  }

  async getProject(parentId: string): Promise<Project | null> {
    return this.prisma.task
      .findOne({
        where: { id: parentId },
      })
      .project();
  }
}
