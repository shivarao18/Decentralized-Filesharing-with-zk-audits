const hre = require("hardhat");

async function main() {
    console.log("Deploying FileMetadata contract...");

    // Get the contract factory
    const FileMetadata = await hre.ethers.getContractFactory("FileMetadata");

    // Deploy the contract
    const fileMetadata = await FileMetadata.deploy();

    // Wait for deployment to finish
    await fileMetadata.deployed();

    console.log("FileMetadata deployed to:", fileMetadata.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
