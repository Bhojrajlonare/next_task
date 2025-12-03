# Task Management API - NestJS Backend

## Description
Backend API for Task Management System with JWT authentication and MySQL database.

## Prerequisites
- Node.js (v18 or higher)
- MySQL Server running on localhost:3306

## Installation

```bash
npm install
```

## Configuration

1. Create a MySQL database named `task_management`
2. Update `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=task_management
JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h
```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Tasks (Protected - Requires JWT)
- `GET /tasks` - Get all tasks for logged-in user
- `POST /tasks` - Create a new task
- `GET /tasks/:id` - Get a specific task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Database Schema

TypeORM will automatically create the following tables:

### Users
- id: Primary Key
- email: Unique, Not Null
- password: Hashed, Not Null
- created_at: Timestamp

### Tasks
- id: Primary Key
- title: Not Null
- description: Text
- status: Enum ('To Do', 'In Progress', 'Completed')
- due_date: Date
- user_id: Foreign Key to Users
- created_at: Timestamp
- updated_at: Timestamp
