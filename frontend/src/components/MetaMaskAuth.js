import React from "react";
import { ethers } from "ethers";

const MetaMaskAuth = ({ setWalletAddress }) => {
    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("MetaMask is not installed. Please install it to use this DApp.");
            return;
        }

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const walletAddress = accounts[0];
            console.log("Connected Wallet Address:", walletAddress);

            // Set wallet address in the parent component
            setWalletAddress(walletAddress);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    };

    return <button onClick={connectWallet}>Connect Wallet</button>;
};

export default MetaMaskAuth;
