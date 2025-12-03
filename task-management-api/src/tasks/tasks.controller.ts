import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Post()
    async create(@Body(ValidationPipe) createTaskDto: CreateTaskDto, @Request() req) {
        return this.tasksService.create(createTaskDto, req.user.userId);
    }

    @Get()
    async findAll(@Request() req) {
        return this.tasksService.findAll(req.user.userId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        return this.tasksService.findOne(+id, req.user.userId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
        @Request() req,
    ) {
        return this.tasksService.update(+id, updateTaskDto, req.user.userId);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
        await this.tasksService.remove(+id, req.user.userId);
        return { message: 'Task deleted successfully' };
    }
}
