import React, { useState } from 'react';

const UploadForm = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (file) {
      onUpload(file);
      setFile(null); // Reset file input
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
