import React, { useState, useEffect } from "react";
import MetaMaskAuth from "./components/MetaMaskAuth";
import FileUpload from "./components/FileUpload";
import FileSharing from "./components/FileSharing";
import FileList from "./components/FileList";
import FilesListSharedWithMe from "./components/FilesListSharedWithMe";
import LogAccess from "./components/LogAccess"; // Import LogAccess component
import { ethers } from "ethers";
import { FILE_METADATA_ABI, FILE_METADATA_ADDRESS } from "./constants/contract";
import { FILE_SHARING_ABI, FILE_SHARING_ADDRESS } from "./constants/contract";
import { AUDIT_LOG_ABI, AUDIT_LOG_ADDRESS, VERIFIER_ABI, VERIFIER_ADDRESS } from "./constants/contract";

const App = () => {
    const [walletAddress, setWalletAddress] = useState(""); // Wallet address after connection
    const [fileMetadataContract, setFileMetadataContract] = useState(null); // File Metadata Contract
    const [fileSharingContract, setFileSharingContract] = useState(null); // File Sharing Contract
    const [auditLogContract, setAuditLogContract] = useState(null);
    const [verifierContract, setVerifierContract] = useState(null);

    useEffect(() => {
        // Initialize the contracts only after the walletAddress is set
        const initializeContracts = async () => {
            if (!walletAddress) {
                console.log("No wallet address detected.");
                return;
            }

            try {
                console.log("Wallet connected successfully.");
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                // Initialize FileMetadata Contract
                const fileMetadata = new ethers.Contract(
                    FILE_METADATA_ADDRESS,
                    FILE_METADATA_ABI,
                    signer
                );
                setFileMetadataContract(fileMetadata);

                // Initialize FileSharing Contract
                const fileSharing = new ethers.Contract(
                    FILE_SHARING_ADDRESS,
                    FILE_SHARING_ABI,
                    signer
                );
                setFileSharingContract(fileSharing);

                // Initialize AuditLog Contract
                const auditLog = new ethers.Contract(
                    AUDIT_LOG_ADDRESS,
                    AUDIT_LOG_ABI,
                    signer
                );
                setAuditLogContract(auditLog);

                // Initialize Verifier Contract
                const verifier = new ethers.Contract(
                    VERIFIER_ADDRESS,
                    VERIFIER_ABI,
                    signer
                );
                setVerifierContract(verifier);

                console.log("Contracts initialized successfully!");
            } catch (error) {
                console.error("Error initializing contracts:", error);
            }
        };

        initializeContracts();
    }, [walletAddress]); // Only run when walletAddress changes

    return (
        <div className="app-container">
            <h1 className="app-title">Blockchain File Sharing DApp</h1>

            {/* Step 1: MetaMask Authentication */}
            {!walletAddress ? (
                <MetaMaskAuth setWalletAddress={setWalletAddress} />
            ) : (
                <div className="content-container">
                    <p className="wallet-info">Connected Wallet: <p>{walletAddress}</p> </p>
                   
                    <div className="grid-sections">
                    {/* Step 2: Upload Files */}
                    <section className="section">
                        <h2>Upload Files</h2>
                        {fileMetadataContract && fileSharingContract ? ( 
                            <FileUpload
                                walletAddress={walletAddress}
                                fileMetadataContract={fileMetadataContract}
                                fileSharingContract={fileSharingContract}
                            />
                        ) : (
                            <p className="loading-text">Loading Upload functionality...</p>
                        )}
                    </section>

                    {/* Step 3: Share Files */}
                    <section className="section">
                        <h2>Share Files</h2>
                        {fileSharingContract ? (
                            <FileSharing contract={fileSharingContract} />
                        ) : (
                            <p className="loading-text">Loading File Sharing functionality...</p>
                        )}
                    </section>

                    {/* Step 4: View Uploaded Files */}
                    <section className="section">
                        <h2>Your Uploaded Files</h2>
                        {fileMetadataContract ? (
                            <FileList walletAddress={walletAddress} contract={fileMetadataContract} />
                        ) : (
                            <p className="loading-text">Loading your uploaded files...</p>
                        )}
                    </section>

                    {/* Step 5: View Received Files */}
                    <section className="section">
                        <h2>Files Shared With You</h2>
                        {fileSharingContract ? (
                            <FilesListSharedWithMe walletAddress={walletAddress} />
                        ) : (
                            <p className="loading-text">Loading shared files...</p>
                        )}
                    </section>

                    {/* Step 6: Log File Access */}
                    <section className="section">
                        <h2>Log File Access</h2>
                        {auditLogContract && verifierContract ? (
                            <LogAccess auditLogContract={auditLogContract} verifierContract={verifierContract} />
                        ) : (
                            <p className="loading-text">Loading access logging functionality...</p>
                        )}
                    </section>
                    </div>
                </div>
            )}
        </div>

    );
};

export default App;
