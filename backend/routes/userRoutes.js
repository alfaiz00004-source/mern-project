const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  createUser,
  loginUser,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
