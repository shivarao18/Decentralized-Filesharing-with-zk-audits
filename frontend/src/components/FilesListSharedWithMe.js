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
        <div>
            <h3>Files Shared With You</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {sharedFiles.length > 0 ? (
                    sharedFiles.map((file, index) => (
                        <li key={index}>
                            CID: {file}
                            <a
                                href={`https://ipfs.io/ipfs/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View File
                            </a>
                        </li>
                    ))
                ) : (
                    <p>No files shared with you yet.</p>
                )}
            </ul>
        </div>
    );
};

export default FileListSharedWithMe;
