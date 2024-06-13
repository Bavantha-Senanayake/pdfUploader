
const multer = require('multer');
const pdf = require('../models/PDF');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

//function to file upload
const uploadFile = async (req, res) => {  
    const title = req.body.title;
    const filename = req.file.filename;
    try{
        await pdf.create({ title:title, pdf:filename});
        res.status(201).send('File uploaded successfully');
    }catch(error){
        res.send(error.message);
    }
   
};
//get all pdfs 
const getpdf = async (req, res) => {

    try{
        const pdfs = await pdf.find();
        res.json(pdfs);
    }catch(error){
        res.send(error.message);
    }
    
};
//getone pdf
const getonepdf = async (req, res) => {
    const id = req.params.id;
    try{
        const pdfs = await pdf.findById(id);
        res.json(pdfs);
    }catch(error){
        res.send(error.message);
    }
    
};

module.exports = {
    getpdf,
    getonepdf,
    upload,
    uploadFile,   
};
