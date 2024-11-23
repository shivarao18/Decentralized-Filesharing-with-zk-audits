import React from 'react';

const FileList = ({ files }) => {
  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
