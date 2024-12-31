const Joi = require('joi');

const loanSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    bookId: Joi.string().uuid().required(),
});

module.exports = { loanSchema };
