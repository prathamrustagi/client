import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLink(res.data.link);
    } catch (error) {
      alert(error.response?.data?.error || 'File upload failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div>
      <nav>
        <span>{localStorage.getItem('email')}</span>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="upload-container">
        <h2>Upload File</h2>
        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
          <button type="submit">Upload</button>
        </form>
        {link && (
          <p>
            File Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
