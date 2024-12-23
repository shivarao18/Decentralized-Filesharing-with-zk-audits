export const FILE_METADATA_ABI = [
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "address", "name": "uploader", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "cid", "type": "string" },
        { "indexed": false, "internalType": "string", "name": "fileName", "type": "string" },
        { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
      ],
      "name": "MetadataUploaded",
      "type": "event"
    },
    {
      "inputs": [
        { "internalType": "string", "name": "_cid", "type": "string" },
        { "internalType": "string", "name": "_fileName", "type": "string" }
      ],
      "name": "addMetadata",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllMetadata",
      "outputs": [
        {
          "components": [
            { "internalType": "string", "name": "cid", "type": "string" },
            { "internalType": "string", "name": "fileName", "type": "string" },
            { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
          ],
          "internalType": "struct FileMetadata.Metadata[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_user", "type": "address" },
        { "internalType": "uint256", "name": "_index", "type": "uint256" }
      ],
      "name": "getMetadata",
      "outputs": [
        { "internalType": "string", "name": "cid", "type": "string" },
        { "internalType": "string", "name": "fileName", "type": "string" },
        { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "address", "name": "_user", "type": "address" }
      ],
      "name": "getMetadataCount",
      "outputs": [
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  export const FILE_SHARING_ABI = [
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "indexed": true, "internalType": "address", "name": "grantee", "type": "address" },
        { "indexed": false, "internalType": "enum FileAccess.AccessLevel", "name": "accessLevel", "type": "uint8" }
      ],
      "name": "AccessGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "indexed": true, "internalType": "address", "name": "grantee", "type": "address" }
      ],
      "name": "AccessRevoked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
        { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }
      ],
      "name": "FileShared",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
        { "indexed": false, "internalType": "string", "name": "ipfsCid", "type": "string" }
      ],
      "name": "FileUploaded",
      "type": "event"
    },
    {
      "inputs": [
        { "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "internalType": "address", "name": "user", "type": "address" }
      ],
      "name": "checkAccess",
      "outputs": [{ "internalType": "enum FileAccess.AccessLevel", "name": "", "type": "uint8" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
      "name": "files",
      "outputs": [
        { "internalType": "address", "name": "owner", "type": "address" },
        { "internalType": "string", "name": "ipfsCid", "type": "string" }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
      "name": "getSharedFiles",
      "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "internalType": "address", "name": "grantee", "type": "address" },
        { "internalType": "enum FileAccess.AccessLevel", "name": "accessLevel", "type": "uint8" }
      ],
      "name": "grantAccess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "internalType": "address", "name": "grantee", "type": "address" }
      ],
      "name": "revokeAccess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        { "internalType": "bytes32", "name": "fileId", "type": "bytes32" },
        { "internalType": "address", "name": "recipient", "type": "address" }
      ],
      "name": "shareFile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "string", "name": "ipfsCid", "type": "string" }],
      "name": "uploadFile",
      "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  
  export const AUDIT_LOG_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "verifierAddress",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "fileId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "action",
          "type": "string"
        }
      ],
      "name": "LogAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "fileId",
          "type": "bytes32"
        },
        {
          "internalType": "string",
          "name": "action",
          "type": "string"
        },
        {
          "internalType": "uint256[2]",
          "name": "proofA",
          "type": "uint256[2]"
        },
        {
          "internalType": "uint256[2][2]",
          "name": "proofB",
          "type": "uint256[2][2]"
        },
        {
          "internalType": "uint256[2]",
          "name": "proofC",
          "type": "uint256[2]"
        },
        {
          "internalType": "uint256[1]",
          "name": "publicSignals",
          "type": "uint256[1]"
        }
      ],
      "name": "addLog",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getLog",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLogsCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "logs",
      "outputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "fileId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "action",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "verifier",
      "outputs": [
        {
          "internalType": "contract Verifier",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  export const VERIFIER_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256[2]",
        "name": "_pA",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[2][2]",
        "name": "_pB",
        "type": "uint256[2][2]"
      },
      {
        "internalType": "uint256[2]",
        "name": "_pC",
        "type": "uint256[2]"
      },
      {
        "internalType": "uint256[1]",
        "name": "_pubSignals",
        "type": "uint256[1]"
      }
    ],
    "name": "verifyProof",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];



// Initialize and export the Verifier contract instance
// export const getVerifierContract = (providerOrSigner) => {
//   return new ethers.Contract(VERIFIER_ADDRESS, VERIFIER_ABI, providerOrSigner);
// };

  export const FILE_SHARING_ADDRESS = "0xa96cB20e9c201E75Df389CC57fAdcC963883947b";
  
  export const FILE_METADATA_ADDRESS="0xfbA1AB1BeC40C53B59AbdeF4f0455fBC48Fd34fa";

  export const AUDIT_LOG_ADDRESS = "0x147922824C9023e0291ce92F5Adccf4D6D0460c1";

  export const VERIFIER_ADDRESS = "0x0aF7909513ad8fc492be68aAFF96d66fe7Fe492B";