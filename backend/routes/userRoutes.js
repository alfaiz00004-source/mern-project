const express = require('express');

const { getUserProfile, updateUserProfile, createUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { registerValidation, loginValidation } = require('../validators/userValidators');

const router = express.Router();

// Profile
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

// Auth
router.post('/register', registerValidation,validate, createUser);
router.post('/login', loginValidation,validate, loginUser);



module.exports = router;
