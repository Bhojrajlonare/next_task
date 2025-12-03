import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    create(createTaskDto: CreateTaskDto, userId: number): Promise<Task>;
    findAll(userId: number): Promise<Task[]>;
    findOne(id: number, userId: number): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task>;
    remove(id: number, userId: number): Promise<void>;
}
