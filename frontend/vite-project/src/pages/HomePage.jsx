// HomePage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pdfjs } from 'react-pdf';
import { getToken } from '../utils/auth';
import LogoutModal from '../components/LogoutModal '; // Import the LogoutModal component

// Set up font faces
const fontFamily = {
  roboto: "'Roboto', sans-serif",
  montserrat: "'Montserrat', sans-serif",
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function HomePage() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [allpdfs, setAllpdfs] = useState([]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to manage the modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    getpdfs();
    getToken();
  }, [refreshPage]);

  const getpdfs = async () => {
    try {
      const result = await axios.get('http://localhost:5000/api/pdfs/getpdf', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAllpdfs(result.data);
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const submitfun = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('No file selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    try {
      const result = await axios.post(
        'http://localhost:5000/api/pdfs/upload12',
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setRefreshPage(!refreshPage);
      // Reset form and state
      setTitle('');
      setFile(null);
      setError(null);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setError('Error uploading PDF');
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true); // Show the logout confirmation modal
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div
      className="min-h-screen bg-gray-100 p-4"
      style={{ fontFamily: fontFamily.roboto }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Welcome....</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={submitfun}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-5">Upload Your File</h1>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter PDF Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            name="filename"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
        >
          Upload PDF
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl text-center mb-5 font-bold text-gray-800 mb-4">
          Available Files
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {allpdfs.map((data) => (
            <div
              key={data._id}
              className="flex mb-4 p-4 bg-gray-200 rounded-lg shadow-md"
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-700">
                  {data.title}
                </h3>
              </div>
              <div>
                <Link
                  to={`/pdf/${data._id}`}
                  target="_blank"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 mt-auto mb-auto rounded-md transition-colors"
                >
                  View File Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {pdfFile && <PdfComp pdfFile={pdfFile} />}

      {/* Logout Modal */}
      <LogoutModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
}

export default HomePage;
