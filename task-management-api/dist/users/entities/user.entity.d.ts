import { Task } from '../../tasks/entities/task.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
    tasks: Task[];
}
