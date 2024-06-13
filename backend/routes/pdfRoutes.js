const express = require('express');
const router = express.Router();
const { upload, uploadFile,getpdf,getonepdf } = require('../controllers/uploadController');
const{authMiddleWare,isUser}=require('../middlewares/authMiddleware');


// Define the route and use the controller

router.post('/upload12',authMiddleWare, upload.single('file'), uploadFile);
router.get('/getpdf', authMiddleWare,getpdf);
router.get('/getonepdf/:id',authMiddleWare,getonepdf);

module.exports = router;

