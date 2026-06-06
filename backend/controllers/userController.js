const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const userResponse = (user, token) => {
  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  if (token) {
    data.token = token;
  }

  return data;
};

const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

const serverError = (res, error) => {
  res.status(500).json({ message: error.message || 'Server error' });
};

const createUser = async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (name.length < 4) {
      return res.status(400).json({ message: 'Name must be at least 4 characters long' });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json(userResponse(user, generateToken(user._id)));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists' });
    }

    return serverError(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!isEmail(email) || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.json(userResponse(user, generateToken(user._id)));
  } catch (error) {
    return serverError(res, error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    return res.json(userResponse(req.user));
  } catch (error) {
    return serverError(res, error);
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.name !== undefined) {
      const name = String(req.body.name).trim();
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      user.name = name;
    }

    if (req.body.phone !== undefined) {
      const phone = String(req.body.phone).trim();
      if (phone && !/^\d+$/.test(phone)) {
        return res.status(400).json({ message: 'Phone must contain digits only' });
      }
      user.phone = phone;
    }

    const updatedUser = await user.save();
    return res.json(userResponse(updatedUser));
  } catch (error) {
    return serverError(res, error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
