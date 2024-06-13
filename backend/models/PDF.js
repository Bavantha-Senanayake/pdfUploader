// backend/models/PDF.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    title: {
        type: String,        
    },
    pdf: {
        type: String,        
    },
});

module.exports = mongoose.model('PdfDetails', pdfSchema);
