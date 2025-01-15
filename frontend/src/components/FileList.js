import React, { useState, useEffect } from "react";
// File list
const FileList = ({ walletAddress, contract }) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            if (!walletAddress || !contract) return;

            try {
                const metadataList = await contract.getAllMetadata();
                const formattedFiles = metadataList.map((data) => ({
                    cid: data.cid,
                    fileName: data.fileName,
                    timestamp: new Date(data.timestamp * 1000).toLocaleString(),
                }));
                setFiles(formattedFiles);
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
                {files.map((file, index) => (
                    <li key={index}>
                        <strong>{file.fileName}</strong> - Uploaded on: {file.timestamp}
                        <br />
                        CID:{" "}
                        <a href={`https://gateway.pinata.cloud/ipfs/${file.cid}`} target="_blank" rel="noopener noreferrer">
                            {file.cid}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;