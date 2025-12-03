'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { tasksAPI } from '@/lib/api';
import { format } from 'date-fns';

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    due_date: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await tasksAPI.getAll();
            setTasks(response.data);
        } catch (err) {
            setError('Failed to load tasks');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await tasksAPI.delete(id);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            alert('Failed to delete task');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-indigo-600">Task Manager</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user?.email}</span>
                            <button
                                onClick={logout}
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">My Tasks</h2>
                        <Link
                            href="/tasks/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create New Task
                        </Link>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                            <div className="flex">
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
                                <div className="px-4 py-5 sm:p-6">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">{task.title}</h3>
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500 line-clamp-3">{task.description}</p>
                                    <div className="mt-4 flex items-center text-sm text-gray-500">
                                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Due: {task.due_date ? format(new Date(task.due_date), 'MMM d, yyyy') : 'No date'}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end space-x-3">
                                    <Link
                                        href={`/tasks/${task.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {tasks.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
