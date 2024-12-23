// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FileMetadata {
    // Metadata structure
    struct Metadata {
        string cid;        // IPFS CID of the metadata JSON
        string fileName;   // Name of the file
        uint256 timestamp; // Timestamp of the upload
    }

    // Mapping from user address to their metadata CIDs
    mapping(address => Metadata[]) private userMetadata;

    // Event for metadata upload
    event MetadataUploaded(address indexed uploader, string cid, string fileName, uint256 timestamp);

    // Function to add metadata
    function addMetadata(string memory _cid, string memory _fileName) public {
        Metadata memory newMetadata = Metadata({
            cid: _cid,
            fileName: _fileName,
            timestamp: block.timestamp
        });

        userMetadata[msg.sender].push(newMetadata);
        emit MetadataUploaded(msg.sender, _cid, _fileName, block.timestamp);
    }

    // Function to get metadata count for a user
    function getMetadataCount(address _user) public view returns (uint256) {
        return userMetadata[_user].length;
    }

    // Function to get metadata by index for a user
    function getMetadata(address _user, uint256 _index) public view returns (string memory cid, string memory fileName, uint256 timestamp) {
        require(_index < userMetadata[_user].length, "Index out of bounds");

        Metadata memory metadata = userMetadata[_user][_index];
        return (metadata.cid, metadata.fileName, metadata.timestamp);
    }

    // Function to get all metadata for the caller
    function getAllMetadata() public view returns (Metadata[] memory) {
        return userMetadata[msg.sender];
    }
}
