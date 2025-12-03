import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TaskStatus {
    TODO = 'To Do',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
}

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO,
    })
    status: TaskStatus;

    @Column({ type: 'date', nullable: true })
    due_date: Date;

    @Column()
    user_id: number;

    @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
