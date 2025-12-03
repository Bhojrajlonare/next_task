import { User } from '../../users/entities/user.entity';
export declare enum TaskStatus {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed"
}
export declare class Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    due_date: Date;
    user_id: number;
    user: User;
    created_at: Date;
    updated_at: Date;
}
