// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ActivityLog {
    // Struct to represent an activity log
    struct Log {
        address user; // Address of the user performing the action
        string action; // Description of the action (e.g., "Upload", "Grant Access")
        bytes32 fileId; // File ID associated with the action
        uint256 timestamp; // Timestamp of the action
    }

    // Array to store all logs
    Log[] private logs;

    // Event to notify about a new log entry
    event LogCreated(address indexed user, string action, bytes32 indexed fileId, uint256 timestamp);

    // Add a new log entry
    function addLog(address user, string memory action, bytes32 fileId) public {
        Log memory newLog = Log({
            user: user,
            action: action,
            fileId: fileId,
            timestamp: block.timestamp
        });

        logs.push(newLog);

        emit LogCreated(user, action, fileId, block.timestamp);
    }

    // Get all logs (use carefully, might be large)
    function getAllLogs() public view returns (Log[] memory) {
        return logs;
    }

    // Get logs for a specific user
    function getLogsByUser(address user) public view returns (Log[] memory) {
        uint256 count = 0;

        // Count matching logs
        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].user == user) {
                count++;
            }
        }

        // Create an array for matching logs
        Log[] memory userLogs = new Log[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].user == user) {
                userLogs[index] = logs[i];
                index++;
            }
        }

        return userLogs;
    }

    // Get logs for a specific file
    function getLogsByFile(bytes32 fileId) public view returns (Log[] memory) {
        uint256 count = 0;

        // Count matching logs
        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].fileId == fileId) {
                count++;
            }
        }

        // Create an array for matching logs
        Log[] memory fileLogs = new Log[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < logs.length; i++) {
            if (logs[i].fileId == fileId) {
                fileLogs[index] = logs[i];
                index++;
            }
        }

        return fileLogs;
    }
}
