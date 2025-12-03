import { IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsDateString()
    due_date?: string;
}
