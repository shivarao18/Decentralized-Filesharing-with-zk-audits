import { ethers } from 'ethers';
import FileStorage from './contracts/FileStorage.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contract = new ethers.Contract(contractAddress, FileStorage.abi, provider.getSigner());
