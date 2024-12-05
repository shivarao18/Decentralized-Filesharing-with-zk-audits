// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./FileAccess.sol";

contract FileSharing is FileAccess {
    // Array to store all shared file IDs
    bytes32[] private sharedFileList;

    // Event emitted when a file is shared
    event FileShared(bytes32 indexed fileId, address indexed owner, address indexed recipient);

    // Share a file with another user
    function shareFile(bytes32 fileId, address recipient) public onlyOwner(fileId) {
        require(recipient != address(0), "Invalid recipient address");
        require(files[fileId].owner == msg.sender, "You are not the owner of this file");

        // Grant read access to the recipient
        files[fileId].permissions[recipient] = AccessLevel.READ;

        // Add the fileId to the shared file list (if not already present)
        bool alreadyShared = false;
        for (uint256 i = 0; i < sharedFileList.length; i++) {
            if (sharedFileList[i] == fileId) {
                alreadyShared = true;
                break;
            }
        }
        if (!alreadyShared) {
            sharedFileList.push(fileId);
        }

        // Emit the file-shared event
        emit FileShared(fileId, msg.sender, recipient);
    }

    // Get a list of all files shared with a specific address
    function getSharedFiles(address user) public view returns (bytes32[] memory) {
        uint256 count = 0;

        // Count the number of files shared with the user
        for (uint256 i = 0; i < sharedFileList.length; i++) {
            if (files[sharedFileList[i]].permissions[user] != AccessLevel.NONE) {
                count++;
            }
        }

        // Create an array to hold the shared files
        bytes32[] memory sharedFiles = new bytes32[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < sharedFileList.length; i++) {
            if (files[sharedFileList[i]].permissions[user] != AccessLevel.NONE) {
                sharedFiles[index] = sharedFileList[i];
                index++;
            }
        }

        return sharedFiles;
    }
}
