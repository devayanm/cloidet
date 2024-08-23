const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserData, 
  requestPasswordReset, 
  resetPassword,
  updateUser,
  logoutUser
} = require('../controllers/authController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, getUserData);
router.post('/password-reset/request', requestPasswordReset);
router.post('/password-reset', resetPassword);
router.put('/me', authMiddleware, updateUser);
router.post('/logout', authMiddleware, logoutUser);

module.exports = router;
