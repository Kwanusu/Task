import React, { useState } from 'react';

const TaskForm = ({ onSave }) => {
    const [userId, setUserId] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const api = "http://127.0.0.1:5000";

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(api, { user_id: userId, description, status });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Create Task</h2>
            <div className="mb-4">
                <label className="block text-gray-700">User ID</label>
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Save Task
            </button>
        </form>
    );
};

export default TaskForm;
