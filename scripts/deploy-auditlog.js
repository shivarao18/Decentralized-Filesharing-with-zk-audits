const hre = require("hardhat");

async function main() {
    const verifierAddress = "0x0aF7909513ad8fc492be68aAFF96d66fe7Fe492B"; 

    const AuditLog = await hre.ethers.getContractFactory("AuditLog");
    const auditLog = await AuditLog.deploy(verifierAddress);

    await auditLog.deployed();

    console.log("AuditLog deployed to:", auditLog.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
