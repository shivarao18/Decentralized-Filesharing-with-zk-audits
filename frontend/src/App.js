import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import FileList from './components/FileList';
import ConnectWalletButton from './components/ConnectWalletButton';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleFileUpload = (file) => {
    // For now, add the file to the local state
    setFiles([...files, file]);
  };

  const handleWalletConnect = () => {
    setWalletConnected(true);
  };

  return (
    <div className="App">
      <h1>Blockchain-based File Sharing System</h1>
      <ConnectWalletButton onConnect={handleWalletConnect} isConnected={walletConnected} />
      {walletConnected ? (
        <>
          <UploadForm onUpload={handleFileUpload} />
          <FileList files={files} />
        </>
      ) : (
        <p>Please connect your wallet to start using the file sharing system.</p>
      )}
    </div>
  );
}

export default App;
