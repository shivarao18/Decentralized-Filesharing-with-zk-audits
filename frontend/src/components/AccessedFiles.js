import React, { useState, useEffect } from "react";

const AccessedFiles = ({ walletAddress, contract }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchAccessedFiles = async () => {
            if (!walletAddress || !contract) return;

            try {
                const sharedFiles = await contract.getSharedFiles(walletAddress);
                setFiles(sharedFiles);
            } catch (error) {
                console.error("Error fetching accessed files:", error);
            }
        };

        fetchAccessedFiles();
    }, [walletAddress, contract]);

    return (
        <div>
            <h3>Files Shared With You:</h3>
            <ul>
                {files.map((fileId) => (
                    <li key={fileId}>{fileId}</li>
                ))}
            </ul>
        </div>
    );
};

export default AccessedFiles;
