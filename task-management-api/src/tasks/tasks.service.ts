import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
        const task = this.tasksRepository.create({
            ...createTaskDto,
            user_id: userId,
        });
        return this.tasksRepository.save(task);
    }

    async findAll(userId: number): Promise<Task[]> {
        return this.tasksRepository.find({
            where: { user_id: userId },
            order: { created_at: 'DESC' },
        });
    }

    async findOne(id: number, userId: number): Promise<Task> {
        const task = await this.tasksRepository.findOne({
            where: { id },
        });

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        if (task.user_id !== userId) {
            throw new ForbiddenException('You do not have access to this task');
        }

        return task;
    }

    async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
        const task = await this.findOne(id, userId);

        Object.assign(task, updateTaskDto);
        return this.tasksRepository.save(task);
    }

    async remove(id: number, userId: number): Promise<void> {
        const task = await this.findOne(id, userId);
        await this.tasksRepository.remove(task);
    }
}
