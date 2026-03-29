const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler')

//middleware function to protects routes
const protect = asyncHandler(async (req , res, next) => {
    let token; // req.header se token store karne ke liye

    //check token hai ya nahi
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];

            //deocde token by verify our stored token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user from token
            req.user = await User.findById(decoded.id).select('-password');

            if(!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            return next(); //middleware complete ab tum controller pe jaa sakte ho
        } catch (error) {
            //agar token expire ,invalid,ya varify nahi hua 
            res.status(401)
            throw new Error('Not authorized, token failed');
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token');
    }
})

module.exports = {protect};
