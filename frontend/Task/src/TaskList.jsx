import React, { useEffect, useState } from 'react';

const TaskList = ({ api }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${api}/api/tasks`)
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, [api]);

    const updateTaskStatus = (taskId, newStatus) => {
        fetch(`${api}/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then((response) => response.json())
        .then(() => {
            setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="mb-2 border-b pb-2">
                        <p><strong>User ID:</strong> {task.user_id}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="pending">Pending</option>
                            <option value="in progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
