const User = require('../models/userModel');
//user ke liye token generate karna 
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');

//helper function generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
};

// Create new user
const createUser = asyncHandler(async (req,res) => {   
    const { name, email, password} = req.body;
    const existUser = await User.findOne({email});
    if(existUser) {
        res.status(400);
        throw new Error('User already exist');
    }
    const user = await User.create({name, email, password});
 
        //201 created status saath me user data aur jwt token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),//jwt token generate karke send kiya
        })

});

const loginUser = asyncHandler(async (req,res) => {
        const {email, password} = req.body;
        //find user in dataase by email
        const user = await User.findOne({email}).select('+password');
        //if user exisit and password match according to database by matchPassword compare enterd password to hash password
        if(user && (await user.matchPassword(password))) {
            //if match user data aur jwt token send karo
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                token: generateToken(user._id),
            })
        } else {
            res.status(401)
            throw new Error('Invalid email or password');
        }

})

// Get all users
const getUserProfile = asyncHandler(async (req, res) => {

    res.json(req.user); // direct use karo kyuki authmiddleware me user check hone ke baad hi yaha aayega 

});

// Update logged-in user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const { name, phone } = req.body;

    if(name !== undefined) {
        user.name = name;
    }
    if(phone !== undefined) {
        user.phone = phone;
    }

    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
    });
});
//


// abhi hum direct req.user update aur delete kar rahe hai bina check kiye ki user hai ya nahi kyuki ye authmiddleware se kaam ho raha hai aur dusri chiz agar sab user me se kisi ek user ko update ya delete karna ho jo ki admin kar sakta hai tab hum req.params.id use karege jo ki product me use hota hai usually


module.exports = { getUserProfile, updateUserProfile, createUser, loginUser };
