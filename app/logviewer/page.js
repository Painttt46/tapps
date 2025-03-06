"use client";
import React, { useState } from 'react';

const LogViewerPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState([
        { id: 1, message: 'Error: Something went wrong', timestamp: '2023-10-01 10:00:00' },
        { id: 2, message: 'Info: User logged in', timestamp: '2023-10-01 10:05:00' },
        { id: 3, message: 'Warning: Low disk space', timestamp: '2023-10-01 10:10:00' },
    ]);

    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Log Viewer</h1>
            <input
                type="text"
                placeholder="Search logs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Message</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.message}</td>
                            <td>{log.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogViewerPage;