import React, { useEffect, useState } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, []);

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">User List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="mb-2 border-b pb-2">
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Active:</strong> {user.isActive.toString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
