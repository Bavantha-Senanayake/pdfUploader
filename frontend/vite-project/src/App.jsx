// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PDFViewer from './pages/PdfViewPage';
import HomePage from './pages/HomePage';

function App() {
    return (
        <Router>
            <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home-page" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/pdf/:id" element={<PDFViewer/>} />
            </Routes>
            </div>
        </Router>
    );
}

export default App;
