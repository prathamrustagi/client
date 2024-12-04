import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Download() {
  const { id } = useParams();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/files/download/${id}`, {
        params: { email, otp },
      });
      window.location.href = res.config.url;
    } catch (error) {
      alert(error.response?.data?.error || 'Download failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Download File</h2>
      <form onSubmit={handleDownload}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Download</button>
      </form>
    </div>
  );
}

export default Download;
