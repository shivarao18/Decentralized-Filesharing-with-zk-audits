// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Verifier.sol";

contract AuditLog {
    Verifier public verifier;

    // Struct to store audit log entries
    struct LogEntry {
        address user;
        bytes32 fileId;
        uint256 timestamp;
        string action;
    }

    LogEntry[] public logs; // Array to store all logs

    // Event to emit when a new log entry is added
    event LogAdded(address indexed user, bytes32 indexed fileId, uint256 timestamp, string action);

    constructor(address verifierAddress) {
        verifier = Verifier(verifierAddress);
    }

    // Function to add a log entry
    function addLog(
        address user,
        bytes32 fileId,
        string memory action,
        uint[2] memory proofA,
        uint[2][2] memory proofB,
        uint[2] memory proofC,
        uint[1] memory publicSignals
    ) public {
        // Verify the proof using the Verifier contract
        bool isValidProof = verifier.verifyProof(proofA, proofB, proofC, publicSignals);
        require(isValidProof, "Invalid ZK proof");

        // Add the log entry
        logs.push(LogEntry({
            user: user,
            fileId: fileId,
            timestamp: block.timestamp,
            action: action
        }));

        emit LogAdded(user, fileId, block.timestamp, action);
    }

    // Function to get logs count
    function getLogsCount() public view returns (uint256) {
        return logs.length;
    }

    // Function to retrieve a specific log entry by index
    function getLog(uint256 index) public view returns (address, bytes32, uint256, string memory) {
        require(index < logs.length, "Log index out of bounds");
        LogEntry storage entry = logs[index];
        return (entry.user, entry.fileId, entry.timestamp, entry.action);
    }
}
