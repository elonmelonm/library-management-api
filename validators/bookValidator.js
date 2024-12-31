const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    isbn: Joi.string().length(13).required(),
    quantity: Joi.number().integer().min(1).required(),
});

module.exports = { bookSchema };
