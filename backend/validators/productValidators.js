const {body} = require('express-validator');

const createProductValidation = [
    body('name')
    .notEmpty()
    .withMessage("Name is required"),

    body('price')
    .isNumeric()
    .withMessage("Price must be a number"),

    body('description')
    .notEmpty()
    .withMessage("Description is required"),
    
    body('category')
    .notEmpty()
    .withMessage("Category is required"),

    ];

    const updateProductValidation = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty"),

  body('price')
    .optional()
    .isNumeric()
    .withMessage("Price must be a number"),

  body('description')
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body('category')
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),
];

module.exports = {createProductValidation,updateProductValidation};