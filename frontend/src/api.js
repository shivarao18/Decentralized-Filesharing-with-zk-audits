import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import FileAccessABI from "./abis/FileAccess.json";
import FileSharingABI from "./abis/FileSharing.json";
import AccessControlABI from "./abis/AccessControl.json";

// IPFS client setup
const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

// Contract addresses (update these after deploying your contracts)
const fileAccessAddress = "0xe435E804F03087842CA2665528eBC99C37A01dEA";
const fileSharingAddress = "0xd5e1821BC2FB18bdD4a56613BE8e4DA4C9B05777";
const accessControlAddress = "0x7E19143b0df780249Dccb65636077ff3495E148b";
const ActivityLogAddress = "0x8C8503a1e0286AB27629D1703028f51Bf2D82040"

// Ethers.js setup
let provider, signer, fileAccessContract, fileSharingContract, accessControlContract;

// Initialize provider, signer, and contracts
export const initializeBlockchain = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    // Initialize contracts
    fileAccessContract = new ethers.Contract(fileAccessAddress, FileAccessABI, signer);
    fileSharingContract = new ethers.Contract(fileSharingAddress, FileSharingABI, signer);
    accessControlContract = new ethers.Contract(accessControlAddress, AccessControlABI, signer);

    return { provider, signer, fileAccessContract, fileSharingContract, accessControlContract };
};


// Upload a file to IPFS
export const uploadToIPFS = async (file) => {
    try {
        const added = await ipfsClient.add(file);
        console.log("File uploaded to IPFS. CID:", added.path);
        return added.path; // IPFS CID
    } catch (error) {
        console.error("Error uploading file to IPFS:", error);
        throw error;
    }
};

// Upload a file to the blockchain
export const uploadFileToBlockchain = async (ipfsCid) => {
    if (!fileAccessContract) {
        throw new Error("FileAccess contract is not initialized.");
    }

    try {
        const tx = await fileAccessContract.uploadFile(ipfsCid);
        await tx.wait(); // Wait for transaction to be mined
        console.log("File uploaded to blockchain with CID:", ipfsCid);
        return tx.hash; // Transaction hash
    } catch (error) {
        console.error("Error uploading file to blockchain:", error);
        throw error;
    }
};

// Fetch uploaded files for a user
export const getUploadedFiles = async (userAddress) => {
    if (!fileAccessContract) {
        throw new Error("FileAccess contract is not initialized.");
    }

    try {
        const files = await fileAccessContract.getUploadedFiles(userAddress);
        console.log("Fetched uploaded files:", files);
        return files; // Array of file IDs
    } catch (error) {
        console.error("Error fetching uploaded files:", error);
        throw error;
    }
};

// Share a file with another user
export const shareFileWithUser = async (fileId, recipientAddress) => {
    if (!fileSharingContract) {
        throw new Error("FileSharing contract is not initialized.");
    }

    try {
        const tx = await fileSharingContract.shareFile(fileId, recipientAddress);
        await tx.wait();
        console.log(`File ${fileId} shared with ${recipientAddress}`);
        return tx.hash;
    } catch (error) {
        console.error("Error sharing file:", error);
        throw error;
    }
};

// Get files shared with a specific user
export const getFilesSharedWithUser = async (userAddress) => {
    if (!fileSharingContract) {
        throw new Error("FileSharing contract is not initialized.");
    }

    try {
        const sharedFiles = await fileSharingContract.getSharedFiles(userAddress);
        console.log("Fetched files shared with user:", sharedFiles);
        return sharedFiles;
    } catch (error) {
        console.error("Error fetching shared files:", error);
        throw error;
    }
};

// Grant a role to a user
export const grantRole = async (role, userAddress) => {
    if (!accessControlContract) {
        throw new Error("AccessControl contract is not initialized.");
    }

    try {
        const tx = await accessControlContract.grantRole(role, userAddress);
        await tx.wait();
        console.log(`Role ${role} granted to ${userAddress}`);
        return tx.hash;
    } catch (error) {
        console.error("Error granting role:", error);
        throw error;
    }
};

// Revoke a role from a user
export const revokeRole = async (role, userAddress) => {
    if (!accessControlContract) {
        throw new Error("AccessControl contract is not initialized.");
    }

    try {
        const tx = await accessControlContract.revokeRole(role, userAddress);
        await tx.wait();
        console.log(`Role ${role} revoked from ${userAddress}`);
        return tx.hash;
    } catch (error) {
        console.error("Error revoking role:", error);
        throw error;
    }
};

// Check if a user has a specific role
export const checkUserRole = async (role, userAddress) => {
    if (!accessControlContract) {
        throw new Error("AccessControl contract is not initialized.");
    }

    try {
        const hasRole = await accessControlContract.hasRole(role, userAddress);
        console.log(`User ${userAddress} has role ${role}:`, hasRole);
        return hasRole;
    } catch (error) {
        console.error("Error checking user role:", error);
        throw error;
    }
};
