import React, { useState } from "react";
import MetaMaskAuth from "./components/MetaMaskAuth";
import FileUpload from "./components/FileUpload";
import FileSharing from "./components/FileSharing";
import FileList from "./components/FileList";
import FilesListSharedWithMe from "./components/FilesListSharedWithMe.js";

const App = () => {
    const [walletAddress, setWalletAddress] = useState(""); // Wallet address after connection

    return (
        <div>
            <h1>Blockchain File Sharing DApp</h1>
            
            {/* Step 1: MetaMask Authentication */}
            {!walletAddress ? (
                <MetaMaskAuth setWalletAddress={setWalletAddress} />
            ) : (
                <div>
                    <p>Connected Wallet: {walletAddress}</p>

                    {/* Step 2: Upload Files */}
                    <h2>Upload Files</h2>
                    <FileUpload />

                    {/* Step 3: Share Files */}
                    <h2>Share Files</h2>
                    <FileSharing walletAddress={walletAddress} />

                    {/* Step 4: View Uploaded Files */}
                    <h2>Your Uploaded Files</h2>
                    <FileList walletAddress={walletAddress} />

                    {/* Step 5: View Received Files */}
                    <h2>Files Shared With You</h2>
                    <FilesListSharedWithMe walletAddress={walletAddress} />
                </div>
            )}
        </div>
    );
};

export default App;
