// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract AccessControl {
    // Define a mapping to store roles for addresses
    mapping(address => mapping(bytes32 => bool)) private roles;

    // Define a constant role for admin
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN");
    bytes32 public constant USER_ROLE = keccak256("USER");

    // Define an event for role changes
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    // Modifier to check if the caller has a specific role
    modifier onlyRole(bytes32 role) {
        require(roles[msg.sender][role], "AccessControl: Access denied");
        _;
    }

    // Constructor to assign the deployer the admin role
    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    // Function to grant a role to an account
    function grantRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(role, account);
    }

    // Function to revoke a role from an account
    function revokeRole(bytes32 role, address account) public onlyRole(ADMIN_ROLE) {
        _revokeRole(role, account);
    }

    // Function to check if an account has a specific role
    function hasRole(bytes32 role, address account) public view returns (bool) {
        return roles[account][role];
    }

    // Internal function to grant a role
    function _grantRole(bytes32 role, address account) internal {
        require(!roles[account][role], "AccessControl: Role already granted");
        roles[account][role] = true;
        emit RoleGranted(role, account, msg.sender);
    }

    // Internal function to revoke a role
    function _revokeRole(bytes32 role, address account) internal {
        require(roles[account][role], "AccessControl: Role not found");
        roles[account][role] = false;
        emit RoleRevoked(role, account, msg.sender);
    }
}
