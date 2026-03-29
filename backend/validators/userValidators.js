const {body} = require('express-validator');

const registerValidation = [
    body('name')
    .notEmpty()
    .isLength({min: 4})
    .withMessage("Name must be at least 4 characters long"),

    body('email')
    .isEmail()
    .withMessage("Invalid email address"),

    body('password')
    .isLength({min: 6})
    .withMessage("Password must be at least 6 characters long"),

]

const loginValidation = [
    body('email')
    .isEmail()
    .withMessage("Invalid email address"),

    body('password')
    .notEmpty()
    .withMessage("Password is required"),

]

module.exports = {registerValidation,loginValidation};