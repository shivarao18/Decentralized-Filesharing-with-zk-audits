import React, { useState } from "react";

const FileSharing = ({ contract }) => {
    const [fileId, setFileId] = useState("");
    const [recipient, setRecipient] = useState("");

    const handleShare = async () => {
        try {
            await contract.shareFile(fileId, recipient);
            alert(`File ${fileId} shared with ${recipient}`);
        } catch (error) {
            console.error("Error sharing file:", error);
        }
    };

    return (
        <div>
            <h3>Share a File</h3>
            <input
                type="text"
                placeholder="File ID"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <button onClick={handleShare}>Share File</button>
        </div>
    );
};

export default FileSharing;
