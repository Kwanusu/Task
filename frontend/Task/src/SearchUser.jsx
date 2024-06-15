import React, { useState } from 'react';

const SearchUser = () => {
    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);
    const api = "http://127.0.0.1:5000";

    const handleSearch = () => {
        fetch(`${api}/api/users?name=${searchString}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => setResults(data))
            .catch((error) => {
                console.error('Error fetching data:', error);
                // Handle error state or feedback to the user
            });
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Search User</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchString}
                    onChange={(e) => setSearchString(e.currentTarget.value)}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <button onClick={handleSearch} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Search
            </button>
            <ul className="mt-4">
                {results.map((user) => (
                    <li key={user.id} className="mb-2 border-b pb-2">
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Active:</strong> {user.isActive.toString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchUser;
