import React, { useState } from "react";
import { create } from "ipfs-http-client";

const projectId = "Your_INFURA_PROJECT_ID"; // Replace with your Infura Project ID
const projectSecret = "Your_INFURA_PROJECT_SECRET"; // Replace with your Infura Project Secret
const auth = "Basic " + btoa(projectId + ":" + projectSecret);

// Connect to IPFS using Infura's IPFS gateway
const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
});

const FileUpload = ({ walletAddress }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [cid, setCid] = useState(""); // CID of the uploaded file

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        try {
            setUploading(true);
            console.log("Uploading file to IPFS...");

            // Convert file to Buffer for IPFS upload
            const added = await client.add(file);
            console.log("IPFS Upload Result:", added);

            setCid(added.path); // Set the CID returned by IPFS
            alert(`File uploaded to IPFS with CID: ${added.path}`);
        } catch (error) {
            console.error("Error uploading file to IPFS:", error);
            alert("Failed to upload file to IPFS.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload File"}
            </button>
            {cid && (
                <p>
                    File uploaded successfully! CID:{" "}
                    <a
                        href={`https://ipfs.io/ipfs/${cid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {cid}
                    </a>
                </p>
            )}
        </div>
    );
};

export default FileUpload;
