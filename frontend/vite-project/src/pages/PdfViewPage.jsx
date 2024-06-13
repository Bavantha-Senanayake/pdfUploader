import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { pdfjs, Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
import { getToken } from '../utils/auth';

// Set workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function PdfView() {
  const { id } = useParams();
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [onePdf, setOnePdf] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/pdfs/getonepdf/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log(result.data);
      setOnePdf(result.data);
      setPdfFile(`http://localhost:5000/uploads/${result.data.pdf}`);
    } catch (error) {
      console.error('Error fetching the PDF: ', error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">PDF View of {onePdf && onePdf.title}.pdf</h1>
        
      <div className="bg-white rounded-lg shadow-md p-4 flex justify-center items-center flex-col">
        {pdfFile && (
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div
                key={`page_${index + 1}`}
                className="mb-4 p-4 bg-gray-200 shadow-md rounded-lg"
              >
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        )}
        <p className="text-sm mt-4">
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </div>
  );
}

export default PdfView;
