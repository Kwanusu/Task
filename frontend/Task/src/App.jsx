import React, { useState } from 'react';
import UserForm from './UserForm';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const App = () => {
    const [view, setView] = useState('users');
    const api = "http://127.0.0.1:5000";

    const handleSaveUser = (api, userData) => {
        fetch(`${api}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then(() => setView('tasks'));
    };

    const handleSaveTask = (api, taskData) => {
        fetch(`${api}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        }).then(() => setView('taskList'));
    };

    return (
        <div className="container mx-auto p-4">
            <nav className="mb-4">
                <button onClick={() => setView('users')} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Create User
                </button>
                <button onClick={() => setView('tasks')} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Create Task
                </button>
                <button onClick={() => setView('taskList')} className="px-4 py-2 bg-blue-500 text-white rounded">
                    View Tasks
                </button>
            </nav>
            {view === 'users' && <UserForm onSave={(userData) => handleSaveUser(api, userData)} />}
            {view === 'tasks' && <TaskForm onSave={(taskData) => handleSaveTask(api, taskData)} />}
            {view === 'taskList' && <TaskList api={api} />}
        </div>
    );
};

export default App;
