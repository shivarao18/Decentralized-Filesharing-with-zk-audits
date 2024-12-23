import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ walletAddress, fileMetadataContract, fileSharingContract }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [cid, setCid] = useState("");
    const [fileId, setFileId] = useState("");
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        if (!walletAddress || !fileMetadataContract || !fileSharingContract) {
            alert("Please connect your wallet and ensure contracts are initialized.");
            return;
        }

        try {
            setUploading(true);
            console.log("Uploading file to Pinata...");

            // Step 1: Upload the file to IPFS
            const formData = new FormData();
            formData.append("file", file);

            const fileResponse = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                headers: {
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
                },
            });

            console.log("File uploaded successfully:", fileResponse.data);
            const fileCid = fileResponse.data.IpfsHash;

            // Step 2: Prepare metadata
            const metadata = {
                name: file.name,
                cid: fileCid,
                uploader: walletAddress, // Use the connected wallet address
                timestamp: new Date().toISOString(),
            };

            // Step 3: Pin metadata to IPFS
            console.log("Pinning metadata to Pinata...");
            const metadataResponse = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
                headers: {
                    pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                    pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
                },
            });

            console.log("Metadata pinned successfully:", metadataResponse.data);
            const metadataCid = metadataResponse.data.IpfsHash;

            // Step 4: Store file details on the blockchain
            console.log("Storing file and metadata on the blockchain...");
            const tx = await fileSharingContract.uploadFile(fileCid);
            const receipt = await tx.wait(); // Wait for transaction receipt

            // Directly capture fileId from the emitted event
            const fileId = receipt.events[0].args.fileId; // Simplified event capture
            console.log("File ID received from smart contract:", fileId);

            console.log("File CID stored on blockchain:", fileCid);
             setFileId(fileId);

            // Step 5: Store metadata CID in the file metadata contract
            const metadataTx = await fileMetadataContract.addMetadata(metadataCid, file.name);
            await metadataTx.wait();

            console.log("Metadata CID stored on blockchain:", metadataTx);

            setCid(fileCid);

            alert(`File and metadata uploaded successfully!
File URL: https://gateway.pinata.cloud/ipfs/${fileCid}
Metadata URL: https://gateway.pinata.cloud/ipfs/${metadataCid}`);
        } catch (error) {
            console.error("Error uploading file or storing metadata:", error);
            alert("Failed to upload file or store metadata. Please try again.");
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
                    <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">
                        {cid}
                    </a>
                    <br />
                    <strong>File ID:</strong> {fileId}
                </p>
            )}
        </div>
    );
};

export default FileUpload;
