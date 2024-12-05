// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FileAccess {
    struct File {
        address owner;
        string ipfsCid;
        mapping(address => AccessLevel) permissions;
    }

    enum AccessLevel { NONE, READ, WRITE }

    mapping(bytes32 => File) public files;

    event FileUploaded(bytes32 indexed fileId, address indexed owner, string ipfsCid);
    event AccessGranted(bytes32 indexed fileId, address indexed grantee, AccessLevel accessLevel);
    event AccessRevoked(bytes32 indexed fileId, address indexed grantee);

    modifier onlyOwner(bytes32 fileId) {
        require(msg.sender == files[fileId].owner, "Not the file owner");
        _;
    }

    // Upload a file
    function uploadFile(string memory ipfsCid) public returns (bytes32) {
        bytes32 fileId = keccak256(abi.encodePacked(ipfsCid, msg.sender, block.timestamp));
        File storage newFile = files[fileId];
        newFile.owner = msg.sender;
        newFile.ipfsCid = ipfsCid;

        emit FileUploaded(fileId, msg.sender, ipfsCid);
        return fileId;
    }

    // Grant access to a file
    function grantAccess(bytes32 fileId, address grantee, AccessLevel accessLevel) public onlyOwner(fileId) {
        require(grantee != address(0), "Invalid address");
        files[fileId].permissions[grantee] = accessLevel;

        emit AccessGranted(fileId, grantee, accessLevel);
    }

    // Revoke access to a file
    function revokeAccess(bytes32 fileId, address grantee) public onlyOwner(fileId) {
        require(grantee != address(0), "Invalid address");
        files[fileId].permissions[grantee] = AccessLevel.NONE;

        emit AccessRevoked(fileId, grantee);
    }

    // Check access level
    function checkAccess(bytes32 fileId, address user) public view returns (AccessLevel) {
        return files[fileId].permissions[user];
    }
}
