import React, { useEffect, useState } from "react";

const AuditLog = ({ auditLogContract }) => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const logEntries = await auditLogContract.getLogs();
            setLogs(logEntries);
        };

        fetchLogs();
    }, [auditLogContract]);

    return (
        <div>
            <h3>Audit Logs</h3>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        File ID: {log.fileId} shared by {log.sender} to {log.recipient} on{" "}
                        {new Date(log.timestamp * 1000).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuditLog;
