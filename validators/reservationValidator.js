const Joi = require('joi');

const reservationSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    bookId: Joi.string().uuid().required(),
});

module.exports = { reservationSchema };
