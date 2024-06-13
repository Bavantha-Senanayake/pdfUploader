// backend/routes/userRoutes.js
const express = require('express');
const { logoutUser,handleRefreshToken,createUser,loginUserCtrl,getSingleUser } = require('../controllers/userController');
const router = express.Router();
const {authMiddleWare,isUser} = require('../middlewares/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/logout',authMiddleWare,logoutUser);
router.get('/refreshToken',handleRefreshToken);
router.get('/:id',isUser,authMiddleWare, getSingleUser);

module.exports = router;
