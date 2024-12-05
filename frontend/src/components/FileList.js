import React, { useState, useEffect } from "react";

const FileList = ({ walletAddress, contract }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            if (!walletAddress || !contract) return;

            try {
                const fileIds = await contract.getUploadedFiles(walletAddress);
                setFiles(fileIds);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, [walletAddress, contract]);

    return (
        <div>
            <h3>Your Uploaded Files:</h3>
            <ul>
                {files.map((fileId) => (
                    <li key={fileId}>{fileId}</li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;

