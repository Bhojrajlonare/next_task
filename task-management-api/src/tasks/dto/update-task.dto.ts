import { IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsDateString()
    due_date?: string;
}
