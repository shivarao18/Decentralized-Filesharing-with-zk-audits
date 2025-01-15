import React, { useState } from "react";
//import { ethers } from "ethers";

const FileSharing = ({ contract }) => {
    const [fileId, setFileId] = useState("");
    const [recipient, setRecipient] = useState("");

    const handleShare = async () => {
        if (!fileId || !recipient) {
            
            alert("Please provide both File ID and Recipient Address.");
            return;
        }

        try {
            //const fileIdBytes32 = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(fileId));
            //console.log("Sharing File ID (hashed as bytes32):", fileIdBytes32);
            console.log("Sharing File ID:", fileId); // Log the provided File ID

            // Directly use the provided fileId if it is already in bytes32 format
            const transaction = await contract.shareFile(fileId, recipient);
            await transaction.wait(); // Wait for the transaction to be mined

            alert(`File ${fileId} successfully shared with ${recipient}`);
        } catch (error) {
            console.error("Error sharing file:", error);
            alert("Failed to share file. Please try again.");
        }
    };

    return (
        <div className="share-file-container">
            <input
                type="text"
                placeholder="File ID (CID)"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
                className="text-input"
            />
            <input
                type="text"
                placeholder="Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="text-input"
            />
            <button onClick={handleShare} className="share-button">
                Share File
            </button>
        </div>

    );
};

export default FileSharing;
