const { ethers } = require("hardhat");

async function main() {
    // Get the Contract Factories
    const FileAccess = await ethers.getContractFactory("FileAccess");
    const FileSharing = await ethers.getContractFactory("FileSharing");
    const AccessControl = await ethers.getContractFactory("AccessControl");
    const ActivityLog = await ethers.getContractFactory("ActivityLog");

    // Deploy the Contracts
    console.log("Deploying FileAccess...");
    const fileAccess = await FileAccess.deploy();
    await fileAccess.deployed();
    console.log(`FileAccess deployed to: ${fileAccess.address}`);

    console.log("Deploying FileSharing...");
    const fileSharing = await FileSharing.deploy();
    await fileSharing.deployed();
    console.log(`FileSharing deployed to: ${fileSharing.address}`);

    console.log("Deploying AccessControl...");
    const accessControl = await AccessControl.deploy();
    await accessControl.deployed();
    console.log(`AccessControl deployed to: ${accessControl.address}`);

    console.log("Deploying ActivityLog...");
    const activityLog = await ActivityLog.deploy();
    await activityLog.deployed();
    console.log(`ActivityLog deployed to: ${activityLog.address}`);

    // Log the Addresses
    console.log("Deployment completed successfully.");
    console.log("Contract Addresses:");
    console.log(`FileAccess: ${fileAccess.address}`);
    console.log(`FileSharing: ${fileSharing.address}`);
    console.log(`AccessControl: ${accessControl.address}`);
    console.log(`ActivityLog: ${activityLog.address}`);
}

// Main function execution
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
