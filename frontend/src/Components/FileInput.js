import React, { useState } from 'react';
import { FileInput, Label } from 'flowbite-react';

function Component() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (!selectedFiles.length) {
      alert('Please select some files to upload.');
      return;
    }

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('files', file); // Assuming your backend expects 'files' as the key
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/backend/upload-assignment/', {
        method: 'POST',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        body: formData,
        redirect: 'follow',
        cache: 'no-cache',
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
      console.log(response)

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Handle successful upload (e.g., clear selected files, display confirmation)
      setSelectedFiles([]);
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred during upload. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
      </div>
      <FileInput id="multiple-file-upload" multiple onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Component;

