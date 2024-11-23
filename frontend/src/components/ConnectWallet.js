import React from 'react';

const ConnectWalletButton = ({ onConnect, isConnected }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      onConnect();
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  };

  return (
    <button onClick={connectWallet} disabled={isConnected}>
      {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWalletButton;
