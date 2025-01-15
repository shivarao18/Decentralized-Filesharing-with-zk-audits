import { useEffect, useState } from "react";
import { getFilesSharedWithUser } from "../api"; // Ensure this function is defined in `api.js`

const FileListSharedWithMe = ({ walletAddress }) => {
    const [sharedFiles, setSharedFiles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSharedFiles = async () => {
            try {
                const files = await getFilesSharedWithUser(walletAddress); // Fetch files shared with this wallet
                setSharedFiles(files);
                setError("");
            } catch (err) {
                console.error("Error fetching shared files:", err);
                setError("Failed to load shared files. Please try again.");
            }
        };

        if (walletAddress) {
            fetchSharedFiles();
        }
    }, [walletAddress]);

    return (
        <div className="shared-files-container">
            <h3 className="section-title">Files Shared With You</h3>
            {error && <p className="error-message">{error}</p>}
            <ul className="file-list">
                {sharedFiles.length > 0 ? (
                    sharedFiles.map((file, index) => (
                        <li key={index} className="file-item">
                            <span className="file-cid">CID: {file}</span>{" "}
                            <a
                                href={`https://ipfs.io/ipfs/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cid-link"
                            >
                                View File
                            </a>
                        </li>
                    ))
                ) : (
                    <p className="no-files-message">No files shared with you yet.</p>
                )}
            </ul>
        </div>
    );
};

export default FileListSharedWithMe;
