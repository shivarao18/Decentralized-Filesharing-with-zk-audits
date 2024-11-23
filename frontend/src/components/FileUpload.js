import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function uploadFileToIPFS(file) {
  const added = await ipfs.add(file);
  return added.path; // IPFS hash to store in blockchain
}
