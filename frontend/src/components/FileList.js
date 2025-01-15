import React, { useState, useEffect } from "react";

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
        <div className="uploaded-files-container">
            <h3 className="section-title">Your Uploaded Files:</h3>
            <ul className="file-list">
                {files.map((file, index) => (
                    <li key={index} className="file-item">
                        <strong className="file-name">{file.fileName}</strong> - Uploaded on: {file.timestamp}
                        <br />
                        CID:{" "}
                        <a
                            href={`https://gateway.pinata.cloud/ipfs/${file.cid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cid-link"
                        >
                            {file.cid}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;